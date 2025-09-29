import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user1',
    description: '유저 id',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    example: '1234',
    description: '비밀번호',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '홍길동이요',
    description: '사용자 닉네임',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;
}

export class DupCcheckDto {
  @ApiProperty({
    example: 'user1',
    description: '유저 id',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  readonly id?: string;

  @ApiProperty({
    example: '홍길동이요',
    description: '사용자 닉네임',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  readonly nickname?: string;
}
