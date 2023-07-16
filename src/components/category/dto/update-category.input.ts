import { CreateCategoryInput } from './create-category.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  id: number;
}
