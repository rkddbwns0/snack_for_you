import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('')
  async favorites(
    @Body('user_id') user_id: number,
    @Body('snack_id') snack_id: number,
  ) {
    console.log(user_id, snack_id);
    return await this.favoritesService.favorite(user_id, snack_id);
  }

  @Get(':user_id')
  async getFavorites(@Param('user_id') user_id: number) {
    return await this.favoritesService.getFavorites(user_id);
  }

  @Get('list/:user_id')
  async favoriteList(@Param('user_id') user_id: number) {
    return await this.favoritesService.favoriteList(user_id);
  }
}
