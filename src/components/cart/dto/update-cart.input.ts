import { CreateCartInput } from './create-cart.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCartInput extends PartialType(CreateCartInput) {
  id: number;
}
