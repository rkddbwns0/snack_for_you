import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { AdminService } from './admin.service';
import { AdminUserController } from './admin.controller';
import { UserModule } from 'src/users/users.module';
import { SnackModule } from 'src/snack/snack.module';
import { OrderModule } from 'src/order/order.module';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    UserModule,
    SnackModule,
    OrderModule,
    ReviewModule,
  ],
  controllers: [AdminUserController],
  providers: [AdminService],
})
export class AdminModule {}
