import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
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

  @Mutation("getSellerProducts")
  public async getSellerProducts(@Args("userId") userId: string) {
    return await this.productService.getSellerProducts(userId);
  }

  @Mutation("deleteProduct")
  public async deleteProduct(@Args("id") id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Mutation("getProductReviews")
  public async getProductReviews(@Args("productId") productId: string) {
    return await this.productService.getProductReviews(productId);
  }

  @Mutation("leaveReview")
  public async leaveReview(
    @Args("productId") productId: string,
    @Args("rating") rating: string,
    @Args("comment") comment: string,
  ) {
    return await this.productService.leaveReview(productId, rating, comment);
  }

  @Query("getProduct")
  public async getProduct(@Args("id") id: string) {
    return await this.productService.getProduct(id);
  }

  @Query("searchProducts")
  public async searchProducts(@Args("title") t: string) {
    return await this.productService.searchProducts(t);
  }

  @Query("getTrendingProducts")
  public async getTrendingProducts() {
    return await this.productService.getTrendingProducts();
  }

  @Query("getFeaturedProducts")
  public async getFeaturedProducts() {
    return await this.productService.getFeaturedProducts();
  }

  @Query("getProductCount")
  public async getProductCount() {
    return await this.productService.getProductCount();
  }
}
