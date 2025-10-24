import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from 'src/dto/review.dto';
import { OrderItemEntity } from 'src/entities/order_items.entity';
import { ReviewEntity } from 'src/entities/review.entity';
import { SnackInfoEntity } from 'src/entities/snack_info.entity';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly review: Repository<ReviewEntity>,

    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,

    @InjectRepository(SnackInfoEntity)
    private readonly snack: Repository<SnackInfoEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly order_item: Repository<OrderItemEntity>,
  ) {}

  async insertReview(createReview: CreateReviewDto) {
    try {
      const user = await this.user.findOne({
        where: { user_id: createReview.user_id },
      });

      console.log(user);

      if (!user) {
        throw new HttpException(
          '존재하지 않는 사용자입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const snack = await this.snack.findOne({
        where: { snack_id: createReview.snack_id },
      });

      console.log(snack);

      if (!snack) {
        throw new HttpException(
          '존재하지 않는 제품입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const order_item = await this.order_item.findOne({
        where: { order_item_id: createReview.order_item_id },
      });

      if (!order_item) {
        throw new HttpException(
          '존재하지 않는 주문 상품입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const review = await this.review.create({
        user: { user_id: createReview.user_id },
        snack: { snack_id: createReview.snack_id },
        order_item: { order_item_id: createReview.order_item_id },
        content: createReview.content,
        score: createReview.score,
      });
      await this.review.save(review);

      return;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async userReview(user_id: number) {
    try {
      const review = await this.review.createQueryBuilder('r')
      .innerJoin('r.snack', 's')
      .innerJoin('r.order_item', 'i')
      .select('r.review_id as review_id')
      .addSelect('s.snack_id as snack_id')
      .addSelect('s.category_id as category_id')
      .addSelect('i.quantity as order_quantity')
      .addSelect('s.name as snack_name')
      .addSelect('s.product_image as snack_image')
      .addSelect('r.content as review_content')
      .addSelect('r.score as review_score')
      .addSelect("TO_CHAR(r.writed_at, 'YYYY-MM-DD HH24:MI:SS') as review_writed_at")
      .where('r.user_id = :user_id', { user_id: user_id })
      .orderBy('r.writed_at', 'DESC')
      .getRawMany();
      return review
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
