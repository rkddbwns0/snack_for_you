import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
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
    description: 'snack_id',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly snack_id: number;

  @ApiProperty({
    example: 2,
    description: 'quantity',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @ApiProperty({
    example: 3000,
    description: 'price',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}
