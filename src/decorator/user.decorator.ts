import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

const jwt = new JwtService({ secret: process.env.JWT_SECRETKEY });
export interface Iuser {
  id: string;
}
const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (!req.header("authorization")) throw new UnauthorizedException();
    const token = req.header("authorization").split("=")[1] as string;

    if (!token) throw new UnauthorizedException();

    const pd = jwt.decode(token) as {
      id: string;
    };

    if (!pd) throw new UnauthorizedException();

    return { id: pd.id };
  },
);

export default User;
