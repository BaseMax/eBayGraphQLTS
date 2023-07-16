import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import User, { Iuser } from "../../decorator/user.decorator";
import { CartService } from "./cart.service";
import { CreateCartInput } from "./dto/create-cart.input";

@Resolver("Cart")
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation("addToCart")
  public async addToCart(
    @Args("ac") ac: CreateCartInput,
    @User() { id }: Iuser,
  ) {
    return await this.cartService.addToCart(ac, id);
  }

  @Mutation("getCartByUser")
  public async getCartByUser(@Args("userId") userId: string) {
    return await this.cartService.getCartByUser(userId);
  }
}
