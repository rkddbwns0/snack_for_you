import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: '1',
    description: '관리자 역할 id',
    type: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly role_id: number;

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
    example: 'qwe1234',
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
    example: '홍길동이요',
    description: '관리자 닉네임',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;
}

export class ValidateAdminDto {
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
    description: '관리자 비밀번호',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
