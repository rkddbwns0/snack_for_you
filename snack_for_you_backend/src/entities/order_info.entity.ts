import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { AddressEntity } from './address.entity';
import { OrderItemEntity } from './order_items.entity';

@Entity('order_info')
export class OrderInfoEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.address_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address: AddressEntity;

  @Column({ type: 'varchar', length: 20, nullable: true, default: '주문완료' })
  status: string;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  payment_method: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @OneToMany(() => OrderItemEntity, (order_item) => order_item.order)
  order_item: OrderItemEntity[];
}
