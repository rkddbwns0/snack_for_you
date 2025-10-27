import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdminRoleEntity } from './admin_role.entity';

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @ManyToOne(() => AdminRoleEntity, (admin_role) => admin_role.role_id)
  @JoinColumn({ name: 'role_id' })
  role: AdminRoleEntity;

  @Column({ type: 'varchar', length: 30, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @Column({ type: 'timestamp' })
  last_login: Date;
}
