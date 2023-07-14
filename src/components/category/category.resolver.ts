import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CategoryService } from "./category.service";

@Resolver("Category")
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation("addCategory")
  public async addCategory(
    @Args("catName") catName: string,
    @Args("subCategory") subCategory: string,
  ) {
    return await this.categoryService.createCategory(catName, subCategory);
  }

  @Query("getSubcategories")
  public async getSubcategories(@Args("subCatId") subCatId: string) {
    return await this.categoryService.getSubcategories(subCatId);
  }
}
