import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserModule } from './admin_user/admin_user.module';
import { AuthModule } from './auth/auth.module';
import { SnackModule } from './snack/snack.module';
import { UserModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AdminUserModule,
    AuthModule,
    SnackModule,
    UserModule,
    AddressModule,
    CartModule,
    OrderModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
