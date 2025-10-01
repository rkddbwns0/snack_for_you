import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SnackInfoEntity } from './snack_info.entity';

@Entity('snack_category')
export class SnackCategoryEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  name: string;

  @OneToMany(() => SnackInfoEntity, (snack_info) => snack_info.category)
  snack_info: SnackInfoEntity[];
}
