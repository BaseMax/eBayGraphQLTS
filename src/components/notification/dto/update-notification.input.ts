import { CreateNotificationInput } from './create-notification.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateNotificationInput extends PartialType(CreateNotificationInput) {
  id: number;
}
