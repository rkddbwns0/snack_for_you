import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateReviewDto } from 'src/dto/review.dto';
import { JwtAuthGuard } from 'src/auth/user/guard/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '리뷰 작성 라우터' })
  @Post()
  async createReview(@Body() createReview: CreateReviewDto) {
    return await this.reviewService.insertReview(createReview);
  }

  @ApiOperation({ summary: '사용자 리뷰 조회 라우터' })
  @Get(':user_id')
  async userReview(@Param('user_id') user_id: number) {
    return await this.reviewService.userReview(user_id);
  }
}
