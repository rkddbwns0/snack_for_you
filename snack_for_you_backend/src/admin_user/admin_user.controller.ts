import { Body, Controller, Post } from '@nestjs/common';
import { AdminUserService } from './admin_user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from 'src/dto/admin_user.dto';

@ApiTags('관리자 관련 처리')
@Controller('/admin')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post('/')
  @ApiOperation({ summary: '관리자 계정 생성' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 200, description: '관리자 계정 생성' })
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminUserService.createAdmin(createAdminDto);
  }
}
