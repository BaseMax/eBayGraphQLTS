import { Resolver, Mutation, Args } from "@nestjs/graphql";
import User, { Iuser } from "../../decorator/user.decorator";
import { OrderService } from "./order.service";

@Resolver("Order")
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation("makeOrder")
  public async makeOrder(
    @Args("productId") productId: string,
    @Args("totalAmount") totalAmount: number,
    @User() { id }: Iuser,
  ) {
    return await this.orderService.makeOrder(productId, totalAmount, id);
  }

  @Mutation("getOrderByProduct")
  public async getOrderByProduct(@Args("productId") productId: string) {
    return await this.orderService.getOrderByProduct(productId);
  }

  @Mutation("getOrderByUser")
  public async getOrderByUser(@Args("userId") userId: string) {
    return await this.orderService.getOrderByUser(userId);
  }

  @Mutation("getShippingAddress")
  public async getShippingAddress(@Args("userId") userId: string) {
    return await this.orderService.getShippingAddress(userId);
  }
}
