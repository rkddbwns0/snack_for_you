import { Controller, Get, Param } from '@nestjs/common';
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

  @ApiOperation({ summary: '스낵 리스트 조회' })
  @Get(':category_id')
  async snackList(@Param('category_id') category_id: number) {
    const result = await this.snackService.getSnackList(category_id);
    return result;
  }

  @ApiOperation({ summary: '스낵 상세 조회' })
  @Get(':category_id/:snack_id')
  async snackDetail(@Param('snack_id') snack_id: number) {
    console.log(snack_id);
    const result = await this.snackService.snackDetail(snack_id);
    return result;
  }
}
