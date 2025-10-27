import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminEntity } from "./admin.entity";

@Entity('admin_role')
export class AdminRoleEntity {
    @PrimaryGeneratedColumn()
    role_id: number;

    @Column({ type: 'varchar', length: 5, nullable: false })
    role_name: string;

    @OneToMany(() => AdminEntity, (admin) => admin.role)
    admin: AdminEntity[];
}