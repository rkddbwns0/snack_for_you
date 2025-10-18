import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from 'src/entities/favorites.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';
import { UserEntity } from 'src/entities/users.entity';
import { FavoriteController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity, UserEntity, SnackInfoEntity]),
  ],
  controllers: [FavoriteController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
