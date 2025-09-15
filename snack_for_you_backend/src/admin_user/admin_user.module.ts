import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserEntity } from 'src/entities/admin_user.entity';
import { AdminUserService } from './admin_user.service';
import { AdminUserController } from './admin_user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUserEntity])],
  controllers: [AdminUserController],
  providers: [AdminUserService],
})
export class AdminUserModule {}
