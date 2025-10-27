import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { AdminService } from './admin.service';
import { AdminUserController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AdminUserController],
  providers: [AdminService],
})
export class AdminModule {}
