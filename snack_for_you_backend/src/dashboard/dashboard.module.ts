import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInfoEntity } from 'src/entities/order_info.entity';
import { OrderItemEntity } from 'src/entities/order_items.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';
import { UserEntity } from 'src/entities/users.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SnackInfoEntity,
      OrderInfoEntity,
      OrderItemEntity,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
