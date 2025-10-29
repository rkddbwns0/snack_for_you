import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidateAdminDto } from 'src/dto/admin.auth.dto';
import { AdminEntity } from 'src/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly admin: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(validateAdmin: ValidateAdminDto) {
    try {
      const { id, password } = validateAdmin;

      const admin = await this.admin.findOne({
        where: { id: id },
        relations: ['role'],
      });

      if (!admin) {
        throw new HttpException(
          '존재하지 않는 관리자입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (!bcrypt.compareSync(password, admin.password)) {
        throw new HttpException(
          '비밀번호가 일치하지 않습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        admin_id: admin.admin_id,
        name: admin.name,
        nickname: admin.nickname,
        role: admin.role.role_name,
      };
    } catch (e) {
      console.error('validateAdmin error', e);
      throw e;
    }
  }

  async login(admin: any) {
    const payload = {
      admin_id: admin.admin_id,
      name: admin.name,
      nickname: admin.nickname,
      role: admin.role,
    };

    const accessToken = this.aceessToken(payload);

    return accessToken;
  }

  aceessToken(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '5h',
    });
    return accessToken;
  }
}
