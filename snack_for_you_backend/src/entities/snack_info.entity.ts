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
  category: SnackCategoryEntity;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  brand: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  weight: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  composition: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  product_form: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  nation_info: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  quantity: number;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  product_image: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reg_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
