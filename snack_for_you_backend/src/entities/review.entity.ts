import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { SnackInfoEntity } from './snack_info.entity';
import { OrderItemEntity } from './order_items.entity';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => SnackInfoEntity, (snack) => snack.snack_id)
  @JoinColumn({ name: 'snack_id' })
  snack: SnackInfoEntity;

  @ManyToOne(() => OrderItemEntity, (order_item) => order_item.order_item_id)
  @JoinColumn({ name: 'order_item_id' })
  order_item: OrderItemEntity;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'int', nullable: false })
  score: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  writed_at: Date;
}
