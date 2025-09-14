import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  address_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: UserEntity;

  @Column({ type: 'varchar', length: 200, nullable: false })
  road_name: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  detail_address: string;

  @Column({ type: 'boolean', default: false })
  basic_address: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
