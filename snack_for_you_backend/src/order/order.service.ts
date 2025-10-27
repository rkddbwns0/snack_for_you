import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { distinct } from 'rxjs';
import { CreateOrderDto } from 'src/dto/order.dto';
import { CartItemEntity } from 'src/entities/cart_items.entity';
import { OrderInfoEntity } from 'src/entities/order_info.entity';
import { OrderItemEntity } from 'src/entities/order_items.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';
import { Repository } from 'typeorm';

export class OrderService {
  constructor(
    @InjectRepository(OrderInfoEntity)
    private readonly order_info: Repository<OrderInfoEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly order_item: Repository<OrderItemEntity>,

    @InjectRepository(CartItemEntity)
    private readonly cart_item: Repository<CartItemEntity>,

    @InjectRepository(SnackInfoEntity)
    private readonly snack_info: Repository<SnackInfoEntity>,
  ) {}

  async createOrder(createOrder: CreateOrderDto) {
    try {
      const order = await this.order_info.create({
        user: { user_id: createOrder.user_id },
        address: { address_id: createOrder.address_id },
        total_price: createOrder.total_price,
        payment_method: createOrder.payment_method,
      });

      const result = await this.order_info.save(order);

      const order_item = createOrder.items.map((item) => {
        return {
          cart_item_id: item.cart_item_id,
          order_id: result.order_id,
          snack_id: item.snack_id,
          quantity: item.quantity,
          price: item.price,
        };
      });

      await Promise.all(
        order_item.map((item) => this.createOrderItem(createOrder.cart, item)),
      );

      return { order_id: result.order_id };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  private async createOrderItem(cart: boolean, item: any) {
    try {
      const order_item = await this.order_item.create({
        order: { order_id: item.order_id },
        snack: { snack_id: item.snack_id },
        quantity: item.quantity,
        price: item.price,
      });

      await this.order_item.save(order_item);
      console.log(cart, item);
      if (cart === true) {
        await this.cart_item.delete({ cart_item_id: item.cart_item_id });
      }

      await this.snack_info.decrement(
        { snack_id: item.snack_id },
        'quantity',
        item.quantity,
      );

      return;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async getOrder(order_id: number) {
    try {
      const order = await this.order_info
        .createQueryBuilder('order_info')
        .select([
          'order_info.order_id as order_id',
          'order_info.status as status',
          'order_info.total_price as total_price',
          'order_info.payment_method as payment_method',
          "TO_CHAR(order_info.order_date, 'YYYY-MM-DD HH24:MI:SS') as order_date",
        ])
        .addSelect('address_info.name as name')
        .addSelect(
          "CONCAT(address_info.road_name, ' ', address_info.detail_address) as address",
        )
        .addSelect('address_info.request as request')
        .innerJoin('order_info.address', 'address_info')
        .where('order_info.order_id = :order_id', { order_id: order_id })
        .getRawOne();

      if (!order) {
        throw new HttpException('Order not found', 404);
      }

      const order_items = await this.order_item
        .createQueryBuilder('order_item')
        .select('order_item.order_item_id as order_item_id')
        .addSelect('snack_info.snack_id as snack_id')
        .addSelect('snack_info.name as name')
        .addSelect('snack_info.product_image as product_image')
        .addSelect('order_item.quantity as quantity')
        .addSelect('order_item.price as price')
        .addSelect(
          'CASE WHEN review.order_item_id IS NOT NULL THEN true ELSE false END as review_status',
        )
        .innerJoin('order_item.snack', 'snack_info')
        .leftJoin(
          'review',
          'review',
          'order_item.order_item_id = review.order_item_id',
        )
        .where('order_item.order_id = :order_id', { order_id: order_id })
        .getRawMany();

      return { order, order_items };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async getAllOrder(user_id: number) {
    try {
      const order = await this.order_info
        .createQueryBuilder('order_info')
        .leftJoin('order_info.order_item', 'order_item')
        .leftJoin('order_item.snack', 'snack_info')
        .select('order_info.order_id as order_id')
        .addSelect('order_info.status as status')
        .addSelect('order_info.total_price as total_price')
        .addSelect('snack_info.name as name')
        .addSelect('snack_info.product_image as product_image')
        .addSelect('order_item.quantity as quantity')
        .addSelect(
          "TO_CHAR(order_info.order_date, 'YYYY-MM-DD HH24:MI:SS') as order_date",
        )
        .where('order_info.user_id = :user_id', { user_id: user_id })
        .distinctOn(['order_info.order_id'])
        .orderBy('order_info.order_id', 'DESC')
        .getRawMany();

      return order;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
