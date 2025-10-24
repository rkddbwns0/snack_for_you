import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnackCategoryEntity } from 'src/entities/snack_category.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';
import { SnackController } from './snack.controller';
import { SnackService } from './snack.service';
import { ReviewEntity } from 'src/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnackInfoEntity,
      SnackCategoryEntity,
      ReviewEntity,
    ]),
  ],
  controllers: [SnackController],
  providers: [SnackService],
})
export class SnackModule {}
