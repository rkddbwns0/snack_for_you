import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { UserEntity } from 'src/entities/users.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';
import { OrderItemEntity } from 'src/entities/order_items.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      UserEntity,
      SnackInfoEntity,
      OrderItemEntity,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
