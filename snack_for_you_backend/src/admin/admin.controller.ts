import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from 'src/dto/admin.auth.dto';
import { AdminAuthGuard } from 'src/auth/admin/admin_guard/admin.auth.guard';

@ApiTags('관리자 관련 처리')
@UseGuards(AdminAuthGuard)
@Controller('/admin')
export class AdminUserController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: '관리자 생성 라우터' })
  @Post()
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

  @ApiOperation({ summary: '모든 스낵 리스트 조회' })
  @Get('/snack')
  async getAllSnackList() {
    const snackList = await this.adminService.getAllSnackList();
    return snackList;
  }

  @ApiOperation({ summary: '모든 사용자 리스트 조회' })
  @Get('/user')
  async getAllUserList() {
    const userList = await this.adminService.getAllUserList();
    return userList;
  }

  @ApiOperation({ summary: '모든 리뷰 리스트 조회' })
  @Get('/review')
  async getAllReviewList() {
    const reviewList = await this.adminService.getAllReviewList();
    return reviewList;
  }
}
