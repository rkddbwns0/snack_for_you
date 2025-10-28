import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from 'src/dto/admin_user.dto';
import { AdminEntity } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/users.service';
import { SnackService } from 'src/snack/snack.service';
import { OrderService } from 'src/order/order.service';
import { ReviewService } from 'src/review/review.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly admin: Repository<AdminEntity>,

    private readonly userService: UserService,
    private readonly snackService: SnackService,
    private readonly orderService: OrderService,
    private readonly reviewService: ReviewService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    try {
      const { id, password, name, role } = createAdminDto;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async getDashboardData() {
    const users = await this.userService.countUser();
    const snacks = await this.snackService.countSnack();
    const orders = await this.orderService.countOrder();
    const reviews = await this.reviewService.countReview();

    return {
      users,
      snacks,
      orders,
      reviews,
    };
  }

  async getRecentData() {
    const orders = await this.orderService.recentOrder();
    const reviews = await this.reviewService.recentReview();
    return {
      orders,
      reviews,
    };
  }
}
