import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/auth.dto';
import { AdminUserEntity } from 'src/entities/admin_user.entity';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUserEntity)
    private readonly admin_user: Repository<AdminUserEntity>,

    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const { admin_id, user_id, password } = loginDto;

      if (admin_id) {
        const admin = await this.admin_user.findOne({
          where: { id: admin_id },
        });

        if (!admin) {
          throw new HttpException(
            '존재하지 않는 아이디입니다.',
            HttpStatus.NOT_FOUND,
          );
        }

        if (!bcrypt.compareSync(password, admin.password)) {
          throw new HttpException(
            '비밀번호가 일치하지 않습니다.',
            HttpStatus.BAD_REQUEST,
          );
        }

        const payload = {
          admin_id: admin.admin_id,
          id: admin.id,
          name: admin.name,
          role: admin.role,
        };

        const accessToken = this.aceessToken(payload);
        const refreshToken = this.refreshToken(payload);

        return { accessToken, refreshToken };
      }

      const user = await this.user.findOne({ where: { id: user_id } });

      if (!user) {
        throw new HttpException(
          '존재하지 않는 사용자입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new HttpException(
          '비밀번호가 일치하지 않습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = {
        user_id: user.user_id,
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        role: 'user',
      };

      const accessToken = this.aceessToken(payload);
      const refreshToken = this.refreshToken(payload);

      return { accessToken, refreshToken };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  private aceessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '15m',
    });
  }

  private refreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '1d',
    });
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const payload = {
        user_id: decoded.user_id || decoded.admin_id,
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
        ...(decoded.nickname && { nickname: decoded.nickname }),
      };

      const newAccessToken = this.aceessToken(payload);
      const newRefreshToken = this.refreshToken(payload);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
