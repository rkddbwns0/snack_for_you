import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderInfoEntity } from './order_info.entity';
import { SnackInfoEntity } from './snack_info.entity';

@Entity('order_items')
@Check('quantity > 0')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  order_item_id: number;

  @ManyToOne(() => OrderInfoEntity, (order_info) => order_info.order_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderInfoEntity;

  @ManyToOne(() => SnackInfoEntity, (snack_info) => snack_info.snack_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'snack_id' })
  snack: SnackInfoEntity;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  price: number;
}
