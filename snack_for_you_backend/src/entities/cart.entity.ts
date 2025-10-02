import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { CartItemEntity } from './cart_items.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => CartItemEntity, (cart_item) => cart_item.cart)
  cart_item: CartItemEntity[];
}
