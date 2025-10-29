import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/entities/review.entity';
import { SnackCategoryEntity } from 'src/entities/snack_category.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SnackService {
  constructor(
    @InjectRepository(SnackInfoEntity)
    private readonly snack_info: Repository<SnackInfoEntity>,

    @InjectRepository(SnackCategoryEntity)
    private readonly snack_category: Repository<SnackCategoryEntity>,

    @InjectRepository(ReviewEntity)
    private readonly review: Repository<ReviewEntity>,
  ) {}

  async getSnackCategory() {
    return await this.snack_category.find();
  }

  async getSnackList(category_id: number) {
    try {
      const snackList = await this.snack_info
        .createQueryBuilder('s')
        .innerJoin('snack_category', 'c', 'c.category_id = s.category_id')
        .leftJoin('favorites', 'f', 'f.snack_id = s.snack_id')
        .leftJoin('review', 'r', 'r.snack_id = s.snack_id')
        .select('s.snack_id as snack_id')
        .addSelect('c.name as category_name')
        .addSelect('s.name as name')
        .addSelect('s.brand as brand')
        .addSelect("CONCAT(s.price, '원') as price")
        .addSelect('s.product_image as product_image')
        .addSelect('COALESCE(COUNT(f.favorite_id), 0) as favorite_count')
        .addSelect('COALESCE(COUNT(r.review_id), 0) as review_count')
        .where('c.category_id = :category_id', {
          category_id,
        })
        .groupBy('c.category_id')
        .addGroupBy('s.snack_id')
        .getRawMany();
      return snackList;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async snackDetail(snack_id: number) {
    try {
      const snack = await this.snack_info
        .createQueryBuilder('snack')
        .select('snack.snack_id as snack_id')
        .addSelect('category.name as category_name')
        .addSelect('snack.name as name')
        .addSelect('snack.brand as brand')
        .addSelect("CONCAT(snack.weight, 'g') as weight")
        .addSelect('snack.composition as composition')
        .addSelect('snack.product_form as product_form')
        .addSelect('snack.nation_info as nation_info')
        .addSelect('snack.price as price')
        .addSelect('snack.quantity as quantity')
        .addSelect('snack.product_image as product_image')
        .addSelect('COALESCE(ROUND(AVG(review.score), 1), 0) as review_score')
        .addSelect('COALESCE(COUNT(review.review_id), 0) as review_count')
        .addSelect(
          'COALESCE(COUNT(favorites.favorite_id), 0) as favorite_count',
        )
        .leftJoin(
          'favorites',
          'favorites',
          'favorites.snack_id = snack.snack_id',
        )
        .innerJoin('snack.category', 'category')
        .leftJoin('review', 'review', 'review.snack_id = snack.snack_id')
        .where('snack.snack_id = :snack_id', { snack_id: snack_id })
        .groupBy('snack.snack_id')
        .addGroupBy('category.name')
        .getRawOne();

      if (!snack) {
        throw new HttpException(
          '존재하지 않는 제품입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const review = await this.review
        .createQueryBuilder('r')
        .innerJoin('r.user', 'u')
        .innerJoin('r.order_item', 'i')
        .innerJoin('i.snack', 's')
        .select('u.nickname as user_nickname')
        .addSelect('s.name as snack_name')
        .addSelect('i.quantity as order_quantity')
        .addSelect('r.review_id as review_id')
        .addSelect('r.content as review_content')
        .addSelect('r.score as review_score')
        .addSelect(
          "TO_CHAR(r.writed_at, 'YYYY-MM-DD HH24:MI:SS') as review_writed_at",
        )
        .where('s.snack_id = :snack_id', { snack_id: snack_id })
        .orderBy('r.writed_at', 'DESC')
        .getRawMany();

      return { snack, review };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async randomSnack() {
    try {
      const snack = await this.snack_info
        .createQueryBuilder('snack')
        .addOrderBy('RANDOM()')
        .limit(10)
        .getMany();

      return snack;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async searchSnack(keyword: string) {
    try {
      const category = await this.snack_category
        .createQueryBuilder('c')
        .innerJoin('snack_info', 's', 's.category_id = c.category_id')
        .leftJoin('favorites', 'f', 'f.snack_id = s.snack_id')
        .leftJoin('review', 'r', 'r.snack_id = s.snack_id')
        .select('c.category_id as category_id')
        .addSelect('c.name as category_name')
        .addSelect('s.name as name')
        .addSelect('s.brand as brand')
        .addSelect('s.price as price')
        .addSelect('s.product_image as product_image')
        .addSelect('COALESCE(COUNT(f.favorite_id), 0) as favorite_count')
        .addSelect('COALESCE(COUNT(r.review_id), 0) as review_count')
        .where('c.name LIKE :keyword', { keyword: `%${keyword}%` })
        .groupBy('c.category_id')
        .addGroupBy('s.snack_id')
        .getRawMany();

      if (!category) {
        const snack = await this.snack_info
          .createQueryBuilder('s')
          .innerJoin('snack_category', 'c', 'c.category_id = s.category_id')
          .leftJoin('favorites', 'f', 'f.snack_id = s.snack_id')
          .leftJoin('review', 'r', 'r.snack_id = s.snack_id')
          .select('s.snack_id as snack_id')
          .addSelect('s.name as name')
          .addSelect('s.brand as brand')
          .addSelect('s.price as price')
          .addSelect('s.product_image as product_image')
          .addSelect('COALESCE(COUNT(f.favorite_id), 0) as favorite_count')
          .addSelect('COALESCE(COUNT(r.review_id), 0) as review_count')
          .where('s.name LIKE :keyword', { keyword: `%${keyword}%` })
          .groupBy('s.snack_id')
          .getRawMany();

        if (!snack) {
          throw new HttpException('검색 결과가 없습니다', HttpStatus.NOT_FOUND);
        }

        return snack;
      }

      return category;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  // admin에서 사용할 코드 //
  async countSnack() {
    try {
      const count = await this.snack_info.count();
      return count;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async AllsnackList() {
    try {
      const snack = await this.snack_info
        .createQueryBuilder('s')
        .innerJoin('snack_category', 'c', 'c.category_id = s.category_id')
        .select('c.name as category_name')
        .addSelect('s.snack_id as snack_id')
        .addSelect('s.name as snack_name')
        .addSelect('s.brand as snack_brand')
        .addSelect('s.price as snack_price')
        .addSelect('s.product_image as snack_image')
        .addSelect('c.category_id as category_id')
        .addSelect('c.name as category_name')
        .addSelect('s.snack_id as snack_id')
        .addSelect('s.name as snack_name')
        .addSelect('s.brand as snack_brand')
        .addSelect('s.quantity as snack_quantity')
        .addSelect('s.price as snack_price')
        .addSelect('s.product_image as snack_image')
        .addSelect('s.reg_at as reg_at')
        .orderBy('s.reg_at', 'DESC')
        .getRawMany();

      return snack;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
