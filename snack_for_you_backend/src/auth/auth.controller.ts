import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('로그인 및 인증 관련 처리')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인 라우터' })
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res) {
    console.log(loginDto);
    const result = await this.authService.login(loginDto);

    res.cookie('refresh_token', result?.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });

    return { access_token: result?.accessToken };
  }

  @ApiOperation({ summary: '인증 라우터' })
  @UseGuards(AuthGuard('jwt'))
  @Post('/me')
  async me(@Req() req) {
    const user = {
      user_id: req.user.user_id || req.user.admin_id,
      id: req.user.id,
      name: req.user.name,
      ...(req.user.role && { role: req.user.role }),
      ...(req.user.nickname && { nickname: req.user.nickname }),
    };
    return user;
  }

  @ApiOperation({ summary: 'refreshToken 재발급 라우터' })
  @Post('/refresh')
  async refresh(@Req() req) {
    const resfreshToken = req.cookies['refresh_token'];

    const result = await this.authService.refresh(resfreshToken);

    req.res.cookie('refresh_token', result?.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return { access_token: result?.accessToken };
  }

  @ApiOperation({ summary: '로그아웃 라우터' })
  @Post('/logout')
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }
}
