import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async getSnackCategory() {
    return await this.snack_category.find();
  }

  async getSnackList(category_id: number) {
    try {
      console.log(category_id);
      const snackList = await this.snack_info
        .createQueryBuilder('s')
        .innerJoin('snack_category', 'c', 'c.category_id = s.category_id')
        .leftJoin('favorites', 'f', 'f.snack_id = s.snack_id')
        .select('s.snack_id as snack_id')
        .addSelect('c.name as category_name')
        .addSelect('s.name as name')
        .addSelect('s.brand as brand')
        .addSelect("CONCAT(s.price, '원') as price")
        .addSelect('s.product_image as product_image')
        .addSelect('COALESCE(COUNT(f.favorite_id), 0) as favorite_count')
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
        .innerJoin('snack.category', 'category')
        .where('snack.snack_id = :snack_id', { snack_id: snack_id })
        .getRawOne();

      if (!snack) {
        throw new HttpException(
          '존재하지 않는 제품입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      return snack;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
