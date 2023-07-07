import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { connect, Model, model, Schema } from "mongoose";
import { hashSync } from "bcrypt";

describe("AppController (e2e)", () => {
  const defaultUser = {
    email: "test@gmail.com",
    name: "test",
    password: "test",
  };

  const accessTokens = {
    defaultUser: "",
  };

  let app: INestApplication;

  // models
  let userModel: Model<any>;

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
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    await loginDefaultUser();
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
