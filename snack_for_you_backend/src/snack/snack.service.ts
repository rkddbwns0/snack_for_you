import { HttpException, Injectable } from '@nestjs/common';
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
      const snackList = await this.snack_info
        .createQueryBuilder('snack')
        .innerJoin('snack.category', 'category')
        .select('snack.snack_id as snack_id')
        .addSelect('snack.name as name')
        .addSelect('snack.brand as brand')
        .addSelect("CONCAT(snack.weight, 'g') as weight")
        .addSelect('snack.composition as composition')
        .addSelect('snack.product_form as product_form')
        .addSelect('snack.nation_info as nation_info')
        .addSelect("CONCAT(snack.price, '원') as price")
        .addSelect('snack.quantity as quantity')
        .addSelect('snack.product_image as product_image')
        .where('category.category_id = :category_id', {
          category_id: category_id,
        })
        .getRawMany();

      return snackList;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
