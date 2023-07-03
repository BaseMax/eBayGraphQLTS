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
});
