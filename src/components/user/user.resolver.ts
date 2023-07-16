import { Resolver, Query } from "@nestjs/graphql";
import User, { Iuser } from "../../decorator/user.decorator";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query("getUser")
  public async getUser(@User() { id }: Iuser) {
    return await this.userService.getUser(id);
  }

  @Query("getUserCount")
  public async getUserCount() {
    return await this.userService.getUserCount();
  }
}
