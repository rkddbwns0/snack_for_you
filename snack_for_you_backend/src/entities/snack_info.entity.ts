import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SnackCategoryEntity } from './snack_category.entity';

@Entity('snack_info')
export class SnackInfoEntity {
  @PrimaryGeneratedColumn()
  snack_id: number;

  @ManyToOne(
    () => SnackCategoryEntity,
    (snack_category) => snack_category.category_id,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'category_id' })
  category_id: SnackCategoryEntity;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'text', default: null })
  description: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reg_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
