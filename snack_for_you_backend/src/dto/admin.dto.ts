import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// 상품 등록 DTO
export class CreateSnackDto {
  @ApiProperty({
    example: 1,
    description: '카테고리 id',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly category_id: number;

  @ApiProperty({
    example: '프링글스',
    description: '상품명',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: '오리온',
    description: '상품 브랜드',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @ApiProperty({
    example: '100g',
    description: '상품 무게',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly weight: string;

  @ApiProperty({
    example: '원통형',
    description: '상품 형태',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly product_form: string;

  @ApiProperty({
    example: '오리온 프링글스',
    description: '상품 성분',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly composition: string;

  @ApiProperty({
    example: '오리온 프링글스',
    description: '상품 성분',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly nation_info: string;
}

// 상품 정보 변경 DTO
export class UpdateSnackDto {
  @ApiProperty({
    example: '프링글스',
    description: '상품명',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    example: '100g',
    description: '상품 무게',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly weight?: string;

  @ApiProperty({
    example: '원통형',
    description: '상품 형태',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly product_form?: string;

  @ApiProperty({
    example: '오리온',
    description: '상품 브랜드',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly brand?: string;

  @ApiProperty({
    example: '오리온 프링글스',
    description: '상품 성분',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly composition?: string;

  @ApiProperty({
    example: '오리온 프링글스',
    description: '상품 성분',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly nation_info?: string;

  @ApiProperty({
    example: '1000',
    description: '상품 가격',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price?: number;

  @ApiProperty({
    example: '1000',
    description: '상품 수량',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly quantity?: number;

  @ApiProperty({
    example: 'https://www.google.com',
    description: '상품 이미지',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly product_image?: string;
}
