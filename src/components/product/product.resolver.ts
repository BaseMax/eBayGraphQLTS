import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { CreateProductInput } from "./dto/create-product.input";
import User, { Iuser } from "../../decorator/user.decorator";
import { UpdateProductInput } from "./dto/update-product.input";

@Resolver("Product")
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation("createProduct")
  public async createProduct(
    @Args("pr") pr: CreateProductInput,
    @User() { id }: Iuser,
  ) {
    return await this.productService.createProduct(id, pr);
  }

  @Mutation("updateProduct")
  public async updateProduct(@Args("pr") pr: UpdateProductInput) {
    return await this.productService.updateProduct(pr);
  }

  @Mutation("deleteProduct")
  public async deleteProduct(@Args("id") id: string) {
    return await this.productService.deleteProduct(id);
  }
}
