import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import mongoose, { connect, Model, model, Schema } from "mongoose";
import { hashSync } from "bcrypt";

describe("AppController (e2e)", () => {
  const defaultUser = {
    email: "test@gmail.com",
    name: "test",
    password: "test",
  };

  let defaultUserId: string;

  const notificationId: string[] = [];
  const accessTokens = {
    defaultUser: "",
  };

  let app: INestApplication;

  // models
  let userModel: Model<any>;
  let notifModel: Model<any>;

  const generateUser = async () => {
    const newPass = hashSync(defaultUser.password, 8);
    await userModel.create({
      email: defaultUser.email,
      password: newPass,
      name: defaultUser.name,
    });
  };

  beforeAll(async () => {
    await connect("mongodb://127.0.0.1:27017/ebay");

    userModel = model("user", new Schema({}, { strict: false }));
    notifModel = model("notifications", new Schema({}, { strict: false }));
    await generateUser();
  });

  const loginDefaultUser = async () => {
    const mutation = `
    mutation auth($input: loginInput!) {
      login(ri: $input) {
       accessToken
       accepted
       user {
          id
        }
      }
    }
    `;
    const input = {
      input: {
        email: defaultUser.email,
        password: defaultUser.password,
      },
    };

    const { body } = await request(app.getHttpServer())
      .post("/graphql")
      .send({ query: mutation, variables: input });

    accessTokens.defaultUser = body.data.login.accessToken;
    defaultUserId = body.data.login.user.id;
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    await loginDefaultUser();

    for (let i = 0; i < 3; i++) {
      const notif = await notifModel.create({
        userId: new mongoose.Types.ObjectId(defaultUserId),
        content: "this is test message",
        isread: false,
        title: "hello max",
      });
      notificationId.push(notif._id);
    }
  });

  describe("authentication", () => {
    const authUser = {
      email: "authUser@gmail.com",
      password: "authUser",
      name: "authUser",
    };

    it("should register successfuly", async () => {
      const mutation = `
      mutation auth($input: registerInput!) {
        register(ri: $input) {
         accessToken
         accepted
         user {
            id
          }
        }
      }
      `;
      const input = {
        input: authUser,
      };

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query: mutation, variables: input });

      expect(status).toBe(200);
      expect(body.data.register).toHaveProperty("user");
      expect(body.data.register.user).toHaveProperty("id");
      expect(body.data.register).toHaveProperty("accessToken");
      expect(body.data.register).toHaveProperty("accepted");
      expect(body.data.register.accepted).toBeTruthy();
    });

    it("should login successfuly", async () => {
      const mutation = `
      mutation auth($input: loginInput!) {
        login(ri: $input) {
         accessToken
         accepted
         user {
            id
          }
        }
      }
      `;
      const input = {
        input: {
          email: authUser.email,
          password: authUser.password,
        },
      };

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query: mutation, variables: input });

      expect(status).toBe(200);
      expect(body.data.login).toHaveProperty("user");
      expect(body.data.login.user).toHaveProperty("id");
      expect(body.data.login).toHaveProperty("accessToken");
      expect(body.data.login).toHaveProperty("accepted");
      expect(body.data.login.accepted).toBeTruthy();
      await userModel.deleteOne({ email: authUser.email });
    });
  });

  describe("product", () => {
    let productId: string;

    const userToCreate = {
      password: hashSync(defaultUser.password, 8),
      email: defaultUser.email,
      name: defaultUser.name,
    };

    let bidId: string;

    const productInfo = {
      title: "test name",
      price: 222,
      description: "terrorist attack",
    };

    it("should create product", async () => {
      const query = `
      mutation product($input: CreateProductInput!) {
        createProduct(pr: $input) {
          id
          title
          seller {
            id
            name
          }
        }
      }
      `;
      const variables = {
        input: productInfo,
      };

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query, variables })
        .set("Authorization", `accessToken=${accessTokens.defaultUser}`);

      expect(status).toBe(200);

      expect(body.data.createProduct).toHaveProperty("id");
      expect(body.data.createProduct).toHaveProperty("title");

      expect(body.data.createProduct).toHaveProperty("seller");
      expect(body.data.createProduct.seller).toHaveProperty("id");
      expect(body.data.createProduct.seller).toHaveProperty("name");

      productId = body.data.createProduct.id;
    });
    it("should return seller product", async () => {
      const query = `
      mutation product {
        getSellerProducts(userId: "${defaultUserId}") {
          id
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });
      expect(status).toBe(200);
      expect(body.data.getSellerProducts).toHaveProperty("id");
    });

    it("should get product view", async () => {
      const query = `
      mutation product {
        getProductReviews(productId: "${productId}") {
          view
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });
      expect(status).toBe(200);
      expect(body.data.getProductReviews).toHaveProperty("view");
    });

    it("should make order", async () => {
      const query = `
      mutation order {
        makeOrder(productId: "${productId}", totalAmount: 22) {
          totalAmount
          product {
            id
          }
          userId {
            id
          }
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query })
        .set("Authorization", `accessToken=${accessTokens.defaultUser}`);

      expect(status).toBe(200);
      expect(body.data.makeOrder).toHaveProperty("totalAmount");
      expect(body.data.makeOrder).toHaveProperty("product");
      expect(body.data.makeOrder).toHaveProperty("userId");
    });

    it("should return order shipping addres", async () => {
      const query = `
     mutation order {
      getShippingAddress(userId: "${defaultUserId}") {
        id
        shippingAddress
      }
     }
      `;
      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);
      expect(body.data.getShippingAddress).toHaveProperty("id");
      expect(body.data.getShippingAddress).toHaveProperty("shippingAddress");
    });

    it("should get order by product id", async () => {
      const query = `
      mutation order {
        getOrderByProduct(productId: "${productId}") {
          totalAmount
          product {
            id
          }
          userId {
            id
          }
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query })
        .set("Authorization", `accessToken=${accessTokens.defaultUser}`);

      expect(status).toBe(200);
      expect(body.data.getOrderByProduct).toHaveProperty("totalAmount");
      expect(body.data.getOrderByProduct).toHaveProperty("product");
      expect(body.data.getOrderByProduct).toHaveProperty("userId");
    });

    it("should get order by product user Id", async () => {
      const query = `
      mutation order {
        getOrderByUser(userId: "${defaultUserId}") {
          totalAmount
          product {
            id
          }
          userId {
            id
          }
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query })
        .set("Authorization", `accessToken=${accessTokens.defaultUser}`);

      expect(status).toBe(200);
      expect(body.data.getOrderByUser).toHaveProperty("totalAmount");
      expect(body.data.getOrderByUser).toHaveProperty("product");
      expect(body.data.getOrderByUser).toHaveProperty("userId");
    });

    it("should place bid", async () => {
      const query = `
      mutation bids {
        placeBids(pb: { amount: 55, productId: "${productId}"}) {
          id
          amount
          product {
            id
            title
            seller {
              id
              name
            }
          }
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query })
        .set("Authorization", `accessToken=${accessTokens.defaultUser}`);

      expect(status).toBe(200);
      expect(body.data.placeBids).toHaveProperty("id");
      expect(body.data.placeBids).toHaveProperty("amount");
      expect(body.data.placeBids).toHaveProperty("product");
      expect(body.data.placeBids.product).toHaveProperty("id");
      expect(body.data.placeBids.product).toHaveProperty("title");
      expect(body.data.placeBids.product.seller).toHaveProperty("id");
      expect(body.data.placeBids.product.seller).toHaveProperty("name");
      bidId = body.data.placeBids.id;
    });

    it("should return bid by user id", async () => {
      const query = `
      query bid {
        getBidsByUser(userId: "${defaultUserId}") {
          id
          amount
          product {
            id
            title
            seller {
              id
              name
            }
          }
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);

      expect(body.data.getBidsByUser).toHaveProperty("id");
      expect(body.data.getBidsByUser).toHaveProperty("amount");
      expect(body.data.getBidsByUser).toHaveProperty("product");
      expect(body.data.getBidsByUser.product).toHaveProperty("id");
      expect(body.data.getBidsByUser.product).toHaveProperty("title");
      expect(body.data.getBidsByUser.product).toHaveProperty("seller");
      expect(body.data.getBidsByUser.product.seller).toHaveProperty("id");
      expect(body.data.getBidsByUser.product.seller).toHaveProperty("name");
    });

    it("should get one bid by product id", async () => {
      const query = `
      query bid {
        getBidsByProduct(productId: "${productId}") {
          id
          amount
          product {
            id
            title
            seller {
              id
              name
            }
          }
        }
      }
      `;
      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);

      expect(body.data.getBidsByProduct).toHaveProperty("id");
      expect(body.data.getBidsByProduct).toHaveProperty("amount");
      expect(body.data.getBidsByProduct).toHaveProperty("product");
      expect(body.data.getBidsByProduct.product).toHaveProperty("id");
      expect(body.data.getBidsByProduct.product).toHaveProperty("title");
      expect(body.data.getBidsByProduct.product).toHaveProperty("seller");
      expect(body.data.getBidsByProduct.product.seller).toHaveProperty("id");
      expect(body.data.getBidsByProduct.product.seller).toHaveProperty("name");
    });

    it("should add product to cart", async () => {
      const query = `
      mutation cart {
        addToCart(ac: {
          productId: "${productId}"
          quantity: 222
        }) {
          id
          product {
            id
            title
          }
          quantity
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query })
        .set("Authorization", `accessToken=${accessTokens.defaultUser}`);

      expect(status).toBe(200);
      expect(body.data.addToCart).toHaveProperty("id");
      expect(body.data.addToCart).toHaveProperty("quantity");
      expect(body.data.addToCart).toHaveProperty("product");
      expect(body.data.addToCart.product).toHaveProperty("id");
      expect(body.data.addToCart.product).toHaveProperty("title");
    });

    it("should return one product in cart", async () => {
      const query = `
      mutation cart {
        getCartByUser(userId: "${defaultUserId}") {
          id
          quantity
          product {
            id
          }
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);
      expect(body.data.getCartByUser).toHaveProperty("id");
      expect(body.data.getCartByUser).toHaveProperty("quantity");
      expect(body.data.getCartByUser).toHaveProperty("product");
    });

    it("should return count of the products in cart", async () => {
      const query = `
      mutation cart {
        getCartCount(userId: "${defaultUserId}") {
          itemCount
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);
      expect(body.data.getCartCount).toHaveProperty("itemCount");
    });

    it("should delete a product from cart and return that product", async () => {
      const query = `
      mutation cart {
        removeFromCart(productId: "${productId}") {
          id
          product {
            id
            title
          }
          quantity
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);
      expect(body.data.removeFromCart).toHaveProperty("id");
      expect(body.data.removeFromCart).toHaveProperty("quantity");
      expect(body.data.removeFromCart).toHaveProperty("product");
      expect(body.data.removeFromCart.product).toHaveProperty("id");
      expect(body.data.removeFromCart.product).toHaveProperty("title");
    });

    it("should get one product", async () => {
      const query = `
      query pr {
        getProduct(id: "${productId}") {
          id
          seller {
            id
          }
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);
      expect(body.data.getProduct).toHaveProperty("id");
      expect(body.data.getProduct).toHaveProperty("seller");
      expect(body.data.getProduct.seller).toHaveProperty("id");
    });

    it("should get one product with search parameter", async () => {
      const query = `
      query pr {
        searchProducts(title: "${productInfo.title}") {
          id
          seller {
            id
          }
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);
      expect(body.data.searchProducts).toHaveProperty("id");
      expect(body.data.searchProducts).toHaveProperty("seller");
      expect(body.data.searchProducts.seller).toHaveProperty("id");
    });

    it("should update product", async () => {
      const query = `
      mutation product($input: UpdateProductInput!) {
        updateProduct(pr: $input) {
          id
          title
          price
          seller {
            id
            name
          }
        }
      }
      `;
      const variables = {
        input: {
          title: "update",
          price: 11,
          description: "terrorist attack",
          productId,
        },
      };

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query, variables })
        .set("Authorization", `accessToken=${accessTokens.defaultUser}`);

      expect(status).toBe(200);

      expect(body.data.updateProduct).toHaveProperty("id");
      expect(body.data.updateProduct).toHaveProperty("title");
      expect(body.data.updateProduct.title).toBe("update");
      expect(body.data.updateProduct.price).toBe(11);

      expect(body.data.updateProduct).toHaveProperty("seller");
      expect(body.data.updateProduct.seller).toHaveProperty("id");
      expect(body.data.updateProduct.seller).toHaveProperty("name");
    });

    it("should delete product", async () => {
      const query = `
      mutation product {
        deleteProduct(id: "${productId}") {
          id
          deleted
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query })
        .set("Authorization", `accessToken=${accessTokens.defaultUser}`);

      expect(status).toBe(200);

      expect(body.data.deleteProduct).toHaveProperty("id");
      expect(body.data.deleteProduct).toHaveProperty("deleted");
      expect(body.data.deleteProduct.deleted).toBeTruthy();
    });
  });

  describe("notification", () => {
    it("should return one notification", async () => {
      const query = `
      mutation notif {
        getNotifications(userId: "${defaultUserId}"){ 
          id
          content
        }
      } 
      `;
      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);

      expect(body.data.getNotifications).toHaveProperty("id");
      expect(body.data.getNotifications).toHaveProperty("content");
    });

    it("should return unread notifications", async () => {
      const query = `
      query notif {
        getUnreadNotificationCount { 
          count
        }
      } 
      `;
      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);

      expect(body.data.getUnreadNotificationCount).toHaveProperty("count");
    });

    it("should mark notification as read", async () => {
      const query = `
      mutation notif {
        markNotificationAsRead(userId: "${defaultUserId}", notificationId: "${notificationId.pop()}") { 
          id
          isread
        }
      } 
      `;
      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);

      expect(body.data.markNotificationAsRead).toHaveProperty("id");
      expect(body.data.markNotificationAsRead).toHaveProperty("isread");
    });

    it("should mark all notification as read for specific user id", async () => {
      const query = `
      mutation notif {
        markAllNotificationsAsRead(userId: "${defaultUserId}") { 
          id
          isread
        }
      } 
      `;
      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);

      expect(body.data.markAllNotificationsAsRead).toHaveProperty("id");
      expect(body.data.markAllNotificationsAsRead).toHaveProperty("isread");
    });
  });

  describe("payment", () => {
    let paymentId: string;

    it("should add payment method", async () => {
      const query = `
      mutation payment($input: AddPaymentMethodInput!) {
        addPaymentMethod(adm: $input) {
          id
          type
        }
      }
      `;

      const variables = {
        input: {
          type: "test",
          cardNumber: "2222222222222222222222222222222",
          expirationDate: "2030/9/11",
          cvv: "444",
          userId: defaultUserId,
        },
      };

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query, variables });

      expect(status).toBe(200);

      expect(body.data.addPaymentMethod).toHaveProperty("id");
      expect(body.data.addPaymentMethod).toHaveProperty("type");
      paymentId = body.data.addPaymentMethod.id;
    });

    it("should return payment method for user", async () => {
      const query = `
      mutation payment {
        getPaymentMethods(userId: "${defaultUserId}") {
          id
          type
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);

      expect(body.data.getPaymentMethods).toHaveProperty("id");
      expect(body.data.getPaymentMethods).toHaveProperty("type");
    });

    it("should delete payment method", async () => {
      const query = `
      mutation payment {
        deletePaymentMethod(userId: "${defaultUserId}", paymentId: "${paymentId}") {
          id
          type
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query });

      expect(status).toBe(200);

      expect(body.data.deletePaymentMethod).toHaveProperty("id");
      expect(body.data.deletePaymentMethod).toHaveProperty("type");
    });
  });

  describe("user", () => {
    it("should return user details", async () => {
      const query = `
      query user {
        getUser {
          name
          id
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .send({ query })
        .set("Authorization", `accessToken=${accessTokens.defaultUser}`);

      expect(status).toBe(200);
      expect(body.data.getUser).toHaveProperty("id");
      expect(body.data.getUser).toHaveProperty("name");
    });
  });
});
