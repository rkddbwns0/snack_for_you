import { Controller, Get } from '@nestjs/common';
import { SnackService } from './snack.service';

@Controller('snack')
export class SnackController {
  constructor(private readonly snackService: SnackService) {}

  @Get('/category')
  async getSnackCategory() {
    const result = await this.snackService.getSnackCategory();
    return { category: result };
  }
}
