import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidateUserDto } from 'src/dto/auth.dto';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async validateUser(validateUser: ValidateUserDto) {
    try {
      const { user_id, password } = validateUser;
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

      return {
        user_id: user.user_id,
        id: user.id,
        name: user.name,
        nickname: user.nickname,
      };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async login(user: any) {
    const payload = {
      user_id: user.user_id,
      id: user.id,
      name: user.name,
      nickname: user.nickname,
    };

    const accessToken = this.aceessToken(payload);
    const refreshToken = this.refreshToken(payload);

    return { accessToken, refreshToken };
  }

  aceessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '15m',
    });
  }

  refreshToken(payload: any) {
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
