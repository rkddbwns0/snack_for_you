import { Module } from '@nestjs/common';
import { AdminJwtStrategy } from './admin_strategy/admin.auth.strategy';
import { AdminLocalStrategy } from './admin_strategy/admin.local.strategy';
import { AdminAuthGuard } from './admin_guard/admin.auth.guard';
import { AdminLocalGuard } from './admin_guard/admin.local.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { AdminAuthController } from './admin.auth.controller';
import { AdminAuthService } from './admin.auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY as string }),
    TypeOrmModule.forFeature([AdminEntity]),
  ],
  controllers: [AdminAuthController],
  providers: [
    AdminJwtStrategy,
    AdminLocalStrategy,
    AdminAuthGuard,
    AdminLocalGuard,
    AdminAuthService,
  ],
})
export class AdminAuthModule {}
