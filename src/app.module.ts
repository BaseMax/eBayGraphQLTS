import { resolve } from "path";
import { config } from "dotenv";

config({
  path: resolve(__dirname, "../.env"),
});
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { AuthenticationModule } from "./components/authentication/authentication.module";
import { ProductModule } from "./components/product/product.module";
import { UserModule } from "./components/user/user.module";
import { BidsModule } from "./components/bids/bids.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ["src/components/**/*.graphql"],
      sortSchema: true,
      context: ({ req }) => ({ req }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          errors: error.extensions.originalError,
        } as any;
        return graphQLFormattedError;
      },
    }),
    AuthenticationModule,
    ProductModule,
    UserModule,
    BidsModule,
  ],
})
export class AppModule {}
