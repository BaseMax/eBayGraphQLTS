import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import userSchema, { User } from "../../models/user.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
