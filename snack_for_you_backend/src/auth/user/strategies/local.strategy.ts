import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'user-local') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'user_id', passwordField: 'password' });
  }

  async validate(user_id: string, password: string) {
    console.log(user_id, password);
    const user = await this.authService.validateUser({
      user_id: user_id,
      password: password,
    });
    return user;
  }
}
