import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from 'src/dto/cart.dto';
import { CartEntity } from 'src/entities/cart.entity';
import { CartItemEntity } from 'src/entities/cart_items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cart: Repository<CartEntity>,

    @InjectRepository(CartItemEntity)
    private readonly cart_item: Repository<CartItemEntity>,
  ) {}

  async getCartItems(cart_id: number, user_id: number) {
    try {
      const cart = await this.cart.findOne({
        where: { cart_id, user: { user_id: user_id } },
      });

      if (!cart) {
        throw new HttpException('Cart not found', 404);
      }

      const cartItems = await this.cart_item
        .createQueryBuilder('cart_item')
        .select('snack.name as name')
        .addSelect('cart_item.quantity as quantity')
        .addSelect('cart_item.price as price')
        .innerJoin('cart_item.snack', 'snack')
        .where('cart_item.cart_id = :cart_id', { cart_id: cart_id })
        .getRawMany();

      return cartItems;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async createCart(createCart: CreateCartDto) {
    try {
      const { user_id, snack_id, quantity, price } = createCart;

      let cart = await this.cart.findOne({
        where: { user: { user_id: user_id } },
      });

      if (!cart) {
        const newCart = this.cart.create({ user: { user_id: user_id } });
        cart = await this.cart.save(newCart);
      }

      const cart_item = await this.cart_item.findOne({
        where: {
          cart: { cart_id: cart?.cart_id },
          snack: { snack_id: snack_id },
        },
      });

      if (cart_item) {
        cart_item.quantity += quantity;
        cart_item.price += price;
        await this.cart_item.save(cart_item);
      } else {
        const newCartItem = this.cart_item.create({
          cart: { cart_id: cart?.cart_id },
          snack: { snack_id: snack_id },
          quantity: quantity,
          price: price,
        });
        await this.cart_item.save(newCartItem);
      }

      return;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async getCart(user_id: number) {
    try {
      const cart = await this.cart
        .createQueryBuilder('cart')
        .select('cart.cart_id as cart_id')
        .addSelect('cart_item.cart_item_id as cart_item_id')
        .addSelect('snack.snack_id as snack_id')
        .addSelect('snack.name as name')
        .addSelect('snack.product_image as product_image')
        .addSelect('cart_item.quantity as quantity')
        .addSelect('cart_item.price as price')
        .innerJoin('cart.cart_item', 'cart_item')
        .innerJoin('cart_item.snack', 'snack')
        .where('cart.user_id = :user_id', { user_id: user_id })
        .orderBy('cart_item.cart_item_id', 'DESC')
        .getRawMany();

      return cart;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async deleteCart(cart_item_id: number[]) {
    try {
      await this.cart_item.delete(cart_item_id);
      return;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async increaseOrDecreaseQuantity(inde: boolean, cart_item_id: number) {
    try {
      const cart_item = await this.cart_item
        .createQueryBuilder('cart_item')
        .select('cart_item.cart_item_id as cart_item_id')
        .addSelect('cart_item.quantity as quantity')
        .addSelect('cart_item.price as price')
        .addSelect('snack.price as snack_price')
        .innerJoin('cart_item.snack', 'snack')
        .where('cart_item.cart_item_id = :cart_item_id', {
          cart_item_id: cart_item_id,
        })
        .getRawOne();

      if (!cart_item) {
        throw new HttpException(
          '존재하지 않는 제품입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (inde === true) {
        await this.cart_item
          .createQueryBuilder('cart_item')
          .update(CartItemEntity)
          .set({
            quantity: cart_item.quantity + 1,
            price: cart_item.price + cart_item.snack_price,
          })
          .where('cart_item_id = :cart_item_id', { cart_item_id: cart_item_id })
          .execute();
        return;
      } else {
        if (cart_item.quantity <= 1) {
          throw new HttpException(
            '1개 이하로 감소할 수 없습니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
        await this.cart_item
          .createQueryBuilder('cart_item')
          .update(CartItemEntity)
          .set({
            quantity: cart_item.quantity - 1,
            price: cart_item.price - cart_item.snack_price,
          })
          .where('cart_item_id = :cart_item_id', { cart_item_id: cart_item_id })
          .execute();
        return;
      }
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
