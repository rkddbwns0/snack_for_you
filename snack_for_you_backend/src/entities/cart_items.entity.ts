import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { SnackInfoEntity } from './snack_info.entity';

@Entity('cart_items')
@Check('quantity > 0')
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  cart_item_id: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cart_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart_id: CartEntity;

  @ManyToOne(() => SnackInfoEntity, (snack_info) => snack_info.snack_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'snack_id' })
  snack_id: SnackInfoEntity;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  price: number;
}
