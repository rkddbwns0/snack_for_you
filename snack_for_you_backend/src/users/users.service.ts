import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/users.dto';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/user/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUser: CreateUserDto) {
    try {
      const { id, password, name, nickname } = createUser;

      const user = await this.user.findOne({ where: { id: id } });

      if (user) {
        throw new HttpException(
          '이미 존재하는 아이디입니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashPassword = this.hashPassword(password);

      await this.user.save({
        id,
        password: hashPassword,
        name,
        nickname,
      });

      return { message: '회원가입이 완료되었습니다!' };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async dupId(id: string) {
    try {
      if (id.includes('admin')) {
        throw new HttpException(
          '해당 아이디는 사용하실 수 없습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.user.findOne({ where: { id: id } });

      if (user) {
        throw new HttpException(
          '이미 존재하는 아이디입니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { message: '사용 가능한 아이디입니다.', status: HttpStatus.OK };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async dupNickname(nickname: string) {
    try {
      const user = await this.user.findOne({ where: { nickname: nickname } });

      if (user) {
        throw new HttpException(
          '이미 사용 중인 닉네임입니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { message: '사용 가능한 닉네임입니다.', status: HttpStatus.OK };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async updateUser(user_id: number, nickname: string) {
    try {
      await this.user.update(user_id, { nickname: nickname });

      const updateUser = await this.user.findOne({
        where: { user_id: user_id },
      });

      const payload = {
        user_id: updateUser?.user_id,
        id: updateUser?.id,
        name: updateUser?.name,
        nickname: updateUser?.nickname,
      };

      const access_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '15m',
      });

      const refresh_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '1d',
      });

      return {
        message: '닉네임이 변경되었습니다.',
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  // admin에서 사용할 코드 //
  async countUser() {
    try {
      const count = await this.user.count();
      return count;
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
