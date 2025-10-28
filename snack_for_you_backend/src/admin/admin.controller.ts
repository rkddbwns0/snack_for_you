import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from 'src/dto/admin_user.dto';

@ApiTags('관리자 관련 처리')
@Controller('/admin')
export class AdminUserController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/')
  @ApiOperation({ summary: '관리자 계정 생성' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 200, description: '관리자 계정 생성' })
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.createAdmin(createAdminDto);
  }

  @ApiOperation({ summary: '대시보드 데이터 조회' })
  @Get('/dashboard')
  async getDashboard() {
    const dashboardData = await this.adminService.getDashboardData();
    const recentData = await this.adminService.getRecentData();
    return {
      dashboardData,
      recentData,
    };
  }
}
