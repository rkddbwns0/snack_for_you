import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidateUserDto } from 'src/dto/auth.dto';
import { LocalGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/auth.guard';

@ApiTags('로그인 및 인증 관련 처리')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인 라우터' })
  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @Body() validateUser: ValidateUserDto,
    @Res({ passthrough: true }) res,
    @Req() req,
  ) {
    console.log(req);
    const tokens = await this.authService.login(req.user);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });

    return { access_token: tokens.accessToken };
  }

  @ApiOperation({ summary: '인증 라우터' })
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async me(@Req() req) {
    return req.user;
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
