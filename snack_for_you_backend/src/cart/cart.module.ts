import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/entities/cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartItemEntity } from 'src/entities/cart_items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, CartItemEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
