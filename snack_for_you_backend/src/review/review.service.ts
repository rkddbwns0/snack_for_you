import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly review: Repository<ReviewEntity>,
  ) {}

  async getReview(snack_id: number) {
    try {
      const review = await this.review
        .createQueryBuilder('review')
        .select([
          'snack_info.name as snack_name',
          'review.review_id as review_id',
          'users.user_id as user_id',
          'users.nickname as nickname',
          'review.content as review_content',
          'review.score as review_score',
          'review.writed_at as review_writed_at',
          'order_item.quantity as order_item_quantity',
        ])
        .innerJoin('review.snack', 'snack_info')
        .innerJoin('review.user', 'users')
        .innerJoin('review.order_item', 'order_item')
        .where('snack_info.snack_id = :snack_id', { snack_id: snack_id })
        .orderBy('review.writed_at', 'DESC')
        .getRawMany();

      return review;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
