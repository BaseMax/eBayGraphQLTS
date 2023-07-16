import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Payment } from "../../models/payment.model";
import { Orders } from "../../models/orders.model";
import { CreatePaymentInput } from "./dto/create-payment.input";
import request from "request";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    @InjectModel(Orders.name) private readonly ordersModel: Model<Orders>,
  ) {}

  private generateMongoId(i: string) {
    return new mongoose.Types.ObjectId(i);
  }

  public async addPaymentMethod(adm: CreatePaymentInput) {
    adm.userId = this.generateMongoId(adm.userId) as unknown as string;
    return await this.paymentModel.create(adm);
  }

  public async getPaymentMethods(userId: string) {
    return await this.paymentModel.findOne({
      userId: this.generateMongoId(userId),
    });
  }

  public async deletePaymentMethod(userId: string, paymentId: string) {
    return await this.paymentModel.findOneAndDelete(
      {
        userId: this.generateMongoId(userId),
        _id: this.generateMongoId(paymentId),
      },
      { returnOriginal: false },
    );
  }

  public async checkout(productId: string) {
    return new Promise(async (resolve) => {
      const product = await this.ordersModel.findOne(
        {
          product: this.generateMongoId(productId),
        },
        {},
        { populate: [{ path: "product" }, { path: "userId" }] },
      );

      const options = {
        method: "POST",
        url: "https://api.idpay.ir/v1.1/payment",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.PAY_APY_KEY,
          "X-SANDBOX": 1,
        },
        body: {
          order_id: product._id,
          amount: 10000,
          callback: "http://localhost:3000/payment/done",
        },
        json: true,
      };
      request(options, function (error, response, body) {
        if (error) resolve({});
        resolve(body);
      });
    });
  }

  public async donePayment(body: any) {
    return new Promise(async (resolve) => {
      await this.ordersModel.findOneAndDelete({ _id: body.order_id });

      const options = {
        method: "POST",
        url: "https://api.idpay.ir/v1.1/payment/verify",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.PAY_APY_KEY,
          "X-SANDBOX": 1,
        },
        body: {
          id: body.id,
          order_id: body.order_id,
        },
        json: true,
      };

      request(options, function (error, response, body) {
        if (error) resolve({});
        resolve(body);
      });
    });
  }
}
