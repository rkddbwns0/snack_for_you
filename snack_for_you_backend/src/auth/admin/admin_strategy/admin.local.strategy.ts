import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminAuthService } from '../admin.auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, 'admin-local') {
  constructor(private readonly adminAuthService: AdminAuthService) {
    super({ usernameField: 'id', passwordField: 'password' });
  }
  async validate(id: string, password: string) {
    const admin = await this.adminAuthService.validateAdmin({
      id,
      password,
    });
    return admin;
  }
}
