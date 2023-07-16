import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Payment } from "../../models/payment.model";
import { CreatePaymentInput } from "./dto/create-payment.input";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
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
}
