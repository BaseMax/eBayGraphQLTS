import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthenticationService } from "./authentication.service";
import { LoginInput } from "./dto/login.input";
import { RegisterInput } from "./dto/register.input";

@Resolver("Authentication")
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation("register")
  public async register(@Args("ri") ri: RegisterInput) {
    return await this.authenticationService.register(ri);
  }

  @Mutation("login")
  public async login(@Args("ri") ri: LoginInput) {
    return await this.authenticationService.login(ri);
  }
}
