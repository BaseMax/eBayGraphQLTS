import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { BidsService } from "./bids.service";
import { CreateBidInput } from "./dto/create-bid.input";

@Resolver("Bid")
export class BidsResolver {
  constructor(private readonly bidsService: BidsService) {}

  @Mutation("placeBids")
  public async placeBids(@Args("pb") pb: CreateBidInput) {
    return await this.bidsService.placeBids(pb);
  }

  @Query("getBidsByProduct")
  public async getBidsByProduct(@Args("productId") productId: string) {
    return await this.bidsService.getBidsByProduct(productId);
  }
}
