import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'admin',
    description: '관리자 id',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    example: '1234',
    description: '관리자 비밀번호 (암호화할 것 bcrypt)',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: '홍길동',
    description: '관리자 이름',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '관리자',
    description: '관리자 역할 구분  ex) ["관리자", "운영자", "..."]',
    type: 'string',
    required: true,
  })
  @IsString()
  readonly role: string;
}
