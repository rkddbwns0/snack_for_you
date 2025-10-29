import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AdminAuthService } from './admin.auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AdminLocalGuard } from './admin_guard/admin.local.guard';
import { ValidateAdminDto } from 'src/dto/admin.auth.dto';
import { AdminAuthGuard } from './admin_guard/admin.auth.guard';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @ApiOperation({ summary: '관리자 로그인 라우터' })
  @Post('login')
  @UseGuards(AdminLocalGuard)
  async adminLogin(@Body() validateAdmin: ValidateAdminDto, @Req() req) {
    const result = await this.adminAuthService.login(req.user);
    return { access_token: result };
  }

  @ApiOperation({ summary: '관리자 인증' })
  @UseGuards(AdminAuthGuard)
  @Post('me')
  async adminMe(@Req() req) {
    return req.user;
  }
}
