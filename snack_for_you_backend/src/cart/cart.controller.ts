import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, IncreaseOrDecreaseDto } from 'src/dto/cart.dto';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(JwtAuthGuard)
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
  @Delete('')
  async deleteCart(@Body('cart_item_id') cart_item_id: number[]) {
    console.log(cart_item_id);
    return await this.cartService.deleteCart(cart_item_id);
  }

  @ApiOperation({ summary: '수량 증감 라우터' })
  @Put(':cart_item_id')
  async increaseOrDecreaseQuantity(
    @Body() inde: IncreaseOrDecreaseDto,
    @Param('cart_item_id') cart_item_id: number,
  ) {
    return await this.cartService.increaseOrDecreaseQuantity(
      inde.inde,
      cart_item_id,
    );
  }
}
