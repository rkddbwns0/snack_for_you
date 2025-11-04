import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({ summary: '모든 주문 리스트 조회' })
  @Get('/order')
  async getAllOrderList() {
    const orderList = await this.adminService.getAllOrderList();
    return orderList;
  }

  @ApiOperation({ summary: '주문 상세 정보 조회회' })
  @Get('/order/:order_id')
  async getOrderDetail(@Param('order_id') order_id: number) {
    const orderList = await this.adminService.getOrderDetail(order_id);
    return orderList;
  }

  @ApiOperation({ summary: '주문 상태 변경' })
  @Put('/order/:order_id')
  async changeOrderStatus(
    @Param('order_id') order_id: number,
    @Body('status') status: string,
  ) {
    const result = await this.adminService.changeOrderStatus(order_id, status);
    return result;
  }

  @ApiOperation({ summary: '상품 삭제 라우터' })
  @Delete('/snack/:snack_id')
  async deleteSnack(@Param('snack_id') snack_id: number) {
    const result = await this.adminService.deleteSnack(snack_id);
    return result;
  }
}
