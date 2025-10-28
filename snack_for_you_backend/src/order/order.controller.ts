import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/order.dto';
import { OrderService } from './order.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/user/guard/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '주문 라우터' })
  @Post('')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: '주문내역 조회 라우터' })
  @Get(':order_id')
  async getOrder(@Param('order_id') order_id: number) {
    return await this.orderService.getOrder(order_id);
  }

  @ApiOperation({ summary: '주문내역 리스트 조회' })
  @Get('/list/:user_id')
  async getAllOrder(@Param('user_id') user_id: number) {
    return await this.orderService.getAllOrder(user_id);
  }
}
