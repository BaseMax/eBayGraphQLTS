import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../models/user.model";
import { RegisterInput } from "./dto/register.input";
import { hashSync, compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  private hashT(i: string) {
    return hashSync(i, 8);
  }

  private compareHash(i: string, h: string) {
    return compareSync(i, h);
  }

  public async register(ri: RegisterInput) {
    const userExists = await this.userModel.findOne({ email: ri.email });
    if (userExists)
      return {
        message: "user exists with this email",
        accepted: false,
      };

    ri.password = this.hashT(ri.password);

    const newUser = await this.userModel.create(ri);

    const accessToken = this.jwtService.sign({ id: newUser._id });

    return {
      accessToken,
      user: newUser,
      message: "user created successfuly",
      accepted: true,
    };
  }

  public async login({ email, password }: LoginInput) {
    const user = await this.userModel.findOne({ email });

    const ispasswordCorrect = this.compareHash(password, user.password || "");
    if (!user || !ispasswordCorrect)
      return {
        user: null,
        message: "user not found",
        accepted: false,
      };

    const accessToken = this.jwtService.sign({ id: user._id });
    return {
      accessToken,
      user,
      message: "login successful",
      accepted: true,
    };
  }
}
