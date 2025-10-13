import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInfoEntity } from 'src/entities/order_info.entity';
import { OrderItemEntity } from 'src/entities/order_items.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CartItemEntity } from 'src/entities/cart_items.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderInfoEntity,
      OrderItemEntity,
      CartItemEntity,
      SnackInfoEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
