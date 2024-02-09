import { IsNumber } from 'class-validator';

export class MessageDto {
  @IsNumber()
  someNumber: number;
}
