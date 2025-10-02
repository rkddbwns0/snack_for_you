import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from 'src/dto/cart.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: '장바구니 생성 라우터' })
  @Post('')
  async createCart(@Body() createCart: CreateCartDto) {
    return await this.cartService.createCart(createCart);
  }

  @ApiOperation({ summary: '장바구니 데이터 라우터' })
  @Get(':user_id')
  async getCart(@Param('user_id') user_id: number) {
    return await this.cartService.getCart(user_id);
  }

  @ApiOperation({ summary: '장바구니 데이터 삭제 라우터' })
  @Delete(':cart_item_id')
  async deleteCart(@Param('cart_item_id') cart_item_id: number) {
    return await this.cartService.deleteCart(cart_item_id);
  }
}
