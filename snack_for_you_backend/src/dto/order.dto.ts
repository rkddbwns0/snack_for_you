import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';

export class CreateOrderDto {
  @ApiProperty({
    example: true,
    description: 'cart_item 여부',
    type: 'boolean',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly cart: boolean;

  @ApiProperty({
    example: 1,
    description: 'user_id',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({
    example: 1,
    description: 'address_id',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly address_id: number;

  @ApiProperty({
    example: 1,
    description: 'total_price',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly total_price: number;

  @ApiProperty({
    example: 'naverpay',
    description: 'payment_method',
    type: 'string',
    maxLength: 30,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly payment_method: string;

  @ApiProperty({
    example: 1,
    description: 'order_items',
    type: 'array',
    required: true,
  })
  readonly items: any[];
}
