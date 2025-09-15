import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: '관리자 id',
    type: 'string',
    required: false,
  })
  readonly admin_id?: string;

  @ApiProperty({
    example: 'user1',
    description: '사용자 id',
    type: 'string',
    required: false,
  })
  readonly user_id?: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호',
    type: 'string',
    required: true,
  })
  readonly password: string;
}
