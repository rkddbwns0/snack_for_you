import { Body, Controller, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, DupCcheckDto } from 'src/dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('사용자 처리 라우터')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입 라우터' })
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return await this.userService.createUser(createUser);
  }

  @ApiOperation({ summary: '중복 확인 라우터 - 아이디, 닉네임' })
  @Post('/dup')
  async dupCheck(@Body() dupCheck: DupCcheckDto) {
    if (dupCheck.id) {
      return await this.userService.dupId(dupCheck.id);
    }
    if (dupCheck.nickname) {
      return await this.userService.dupNickname(dupCheck.nickname);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '사용자 정보 변경 라우터' })
  @Put('/:user_id')
  async updateUser(
    @Param('user_id') user_id: number,
    @Body() body: { nickname: string },
    @Res({ passthrough: true }) res,
  ) {
    const result = await this.userService.updateUser(user_id, body.nickname);
    res.cookie('refresh_token', result?.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });
    return { access_token: result?.access_token, message: result?.message };
  }
}
