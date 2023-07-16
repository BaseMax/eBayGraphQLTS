import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { PaymentService } from "./payment.service";
import { CreatePaymentInput } from "./dto/create-payment.input";

@Resolver("Payment")
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation("addPaymentMethod")
  public async addPaymentMethod(@Args("adm") adm: CreatePaymentInput) {
    return await this.paymentService.addPaymentMethod(adm);
  }

  @Mutation("getPaymentMethods")
  public async getPaymentMethods(@Args("userId") userId: string) {
    return await this.paymentService.getPaymentMethods(userId);
  }

  @Mutation("deletePaymentMethod")
  public async deletePaymentMethod(
    @Args("userId") userId: string,
    @Args("paymentId") paymentId: string,
  ) {
    return await this.paymentService.deletePaymentMethod(userId, paymentId);
  }
}
