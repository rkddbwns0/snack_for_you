import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    example: 'user1',
    description: '사용자 id 고유넘버',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: '서울특별시 ~~~~...',
    description: '주소',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly road_name: string;

  @ApiProperty({
    example: '홍길동아파트 101호',
    description: '상세주소',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly detail_address: string;

  @ApiProperty({
    example: 'true',
    description: '기본주소',
    type: 'boolean',
    required: true,
    default: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly basic_address: boolean;

  @ApiProperty({
    example: '택배기사님 안전 운전해 주세요!',
    description: '택배기사님 안전 운전해 주세요!',
    type: 'string',
    required: false,
    default: '택배기사님 안전 운전해 주세요!',
  })
  @IsString()
  @IsNotEmpty()
  readonly request: string;
}
