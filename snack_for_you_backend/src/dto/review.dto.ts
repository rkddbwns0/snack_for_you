import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderItemEntity } from 'src/entities/order_items.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';
import { UserEntity } from 'src/entities/users.entity';

export class CreateReviewDto {
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
    example: 1,
    description: 'order_item_id',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly order_item_id: number;

  @ApiProperty({
    example: 'review',
    description: 'review',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    example: 1,
    description: 'score',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly score: number;
}
