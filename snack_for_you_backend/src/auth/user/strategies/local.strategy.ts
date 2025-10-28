import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'user_id', passwordField: 'password' });
  }

  async validate(user_id: string, password: string) {
    const user = await this.authService.validateUser({
      user_id: user_id,
      password: password,
    });
    return user;
  }
}
