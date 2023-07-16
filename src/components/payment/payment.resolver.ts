import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { PaymentService } from "./payment.service";
import { CreatePaymentInput } from "./dto/create-payment.input";
import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Resolver("Payment")
@Controller("payment")
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

  @Mutation("checkout")
  public async checkout(@Args("productId") productId: string) {
    return await this.paymentService.checkout(productId);
  }

  @Get("/done")
  public async donePayment(@Req() req: Request, @Res() res: Response) {
    return await this.paymentService.donePayment(req.body);
  }
}
