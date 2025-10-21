import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesEntity } from 'src/entities/favorites.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,

    @InjectRepository(SnackInfoEntity)
    private readonly snack_info: Repository<SnackInfoEntity>,

    @InjectRepository(FavoritesEntity)
    private readonly favorites: Repository<FavoritesEntity>,
  ) {}

  async getFavorites(user_id: number) {
    try {
      const user = await this.user.findOne({ where: { user_id: user_id } });

      if (!user) {
        throw new HttpException(
          '존재하지 않는 유저입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const favorites = await this.favorites
        .createQueryBuilder('favorites')
        .select(['snack_info.snack_id as snack_id', 'users.user_id as user_id'])
        .innerJoin('favorites.snack', 'snack_info')
        .innerJoin('favorites.user', 'users')
        .where('users.user_id = :user_id', { user_id: user_id })
        .getRawMany();

      return favorites;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async favorite(user_id: number, snack_id: number) {
    try {
      const user = await this.user.findOne({ where: { user_id: user_id } });

      if (!user) {
        throw new HttpException(
          '존재하지 않는 유저입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const snack = await this.snack_info.findOne({
        where: { snack_id: snack_id },
      });

      if (!snack) {
        throw new HttpException(
          '존재하지 않는 제품입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const favorite = await this.favorites.findOne({
        where: { user: { user_id: user_id }, snack: { snack_id: snack_id } },
      });

      if (!favorite) {
        const newFavorite = this.favorites.create({
          user: { user_id: user_id },
          snack: { snack_id: snack_id },
        });
        await this.favorites.save(newFavorite);
        return;
      }

      await this.favorites.delete({ favorite_id: favorite.favorite_id });

      return;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async favoriteList(user_id: number) {
    try {
      const list = await this.favorites
        .createQueryBuilder('f')
        .innerJoin('snack_info', 's', 's.snack_id = f.snack_id')
        .select('s.snack_id as snack_id')
        .addSelect('s.name as snack_name')
        .addSelect('s.product_image as snack_image')
        .addSelect('s.price as snack_price')
        .addSelect(
          `(select COALESCE(COUNT(*), 0) from favorites where favorites.snack_id = s.snack_id)`,
          'favorite_count',
        )
        .where('f.user_id = :user_id', { user_id })
        .groupBy('f.favorite_id')
        .addGroupBy('s.snack_id')
        .orderBy('f.created_at', 'DESC')
        .getRawMany();

      return list;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
