import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/users.service';
import { SnackService } from 'src/snack/snack.service';
import { OrderService } from 'src/order/order.service';
import { ReviewService } from 'src/review/review.service';
import { CreateAdminDto } from 'src/dto/admin.auth.dto';

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
      const { id, password, name, nickname, role_id } = createAdminDto;

      const admin = await this.admin.findOne({ where: { id } });
      if (admin) {
        throw new HttpException(
          '이미 존재하는 관리자입니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = this.hashPassword(password);

      const newAdmin = this.admin.create({
        role: { role_id },
        id,
        password: hashedPassword,
        name,
        nickname,
      });
      await this.admin.save(newAdmin);
      return newAdmin;
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

  async getAllSnackList() {
    const snackList = await this.snackService.AllsnackList();
    return snackList;
  }

  async getAllUserList() {
    const userList = await this.userService.allUserList();
    return userList;
  }

  async getAllReviewList() {
    const review = await this.reviewService.allReviewList();
    return review;
  }
}
