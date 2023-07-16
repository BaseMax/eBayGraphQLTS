import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import User, { Iuser } from "../../decorator/user.decorator";
import { BidsService } from "./bids.service";
import { CreateBidInput } from "./dto/create-bid.input";

@Resolver("Bid")
export class BidsResolver {
  constructor(private readonly bidsService: BidsService) {}

  @Mutation("placeBids")
  public async placeBids(
    @Args("pb") pb: CreateBidInput,
    @User() { id }: Iuser,
  ) {
    return await this.bidsService.placeBids(pb, id);
  }

  @Query("getBidsByProduct")
  public async getBidsByProduct(@Args("productId") productId: string) {
    return await this.bidsService.getBidsByProduct(productId);
  }

  @Query("getBidsByUser")
  public async getBidsByUser(@Args("userId") userId: string) {
    return await this.bidsService.getBidsByUser(userId);
  }
}
