import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from 'src/dto/admin_user.dto';
import { AdminUserEntity } from 'src/entities/admin_user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUserEntity)
    private readonly admin_user: Repository<AdminUserEntity>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    try {
      const { id, password, name, role } = createAdminDto;

      const admin = await this.admin_user.findOne({ where: { id } });

      if (admin) {
        throw new HttpException(
          '이미 존재하는 아이디입니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashPassword = this.hashPassword(password);

      await this.admin_user.save({
        id,
        password: hashPassword,
        name,
        role,
      });

      return {
        result: 'success',
      };
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
}
