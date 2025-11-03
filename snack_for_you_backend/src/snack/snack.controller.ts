import { Controller, Delete, Get, Param } from '@nestjs/common';
import { SnackService } from './snack.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('snack')
export class SnackController {
  constructor(private readonly snackService: SnackService) {}

  @ApiOperation({ summary: '스낵 카테고리 조회' })
  @Get('/category')
  async getSnackCategory() {
    const result = await this.snackService.getSnackCategory();
    return { category: result };
  }

  @Get('/search/:keyword')
  async searchSnack(@Param('keyword') keyword: string) {
    const result = await this.snackService.searchSnack(keyword);
    return result;
  }

  @ApiOperation({ summary: '스낵 리스트 조회' })
  @Get(':category_id')
  async snackList(@Param('category_id') category_id: number) {
    const result = await this.snackService.getSnackList(category_id);
    return result;
  }

  @ApiOperation({ summary: '스낵 상세 조회' })
  @Get(':category_id/:snack_id')
  async snackDetail(@Param('snack_id') snack_id: number) {
    const result = await this.snackService.snackDetail(snack_id);
    return result;
  }

  @ApiOperation({ summary: '랜덤 스낵 추천' })
  @Get()
  async randomSnack() {
    const result = await this.snackService.randomSnack();
    return result;
  }

  // delete method
  @ApiOperation({ summary: '상품 삭제 라우터' })
  @Delete('/snack/:snack_id')
  async deleteSnack(@Param('snack_id') snack_id: number) {}
}
