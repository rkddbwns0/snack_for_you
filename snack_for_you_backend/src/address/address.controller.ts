import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/dto/address.dto';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: '배송지 생성 라우터' })
  @Post('')
  async createAddress(@Body() createAddress: CreateAddressDto) {
    const result = this.addressService.createAddress(createAddress);
    return result;
  }

  @ApiOperation({ summary: '배송지 조회 라우터' })
  @Get(':user_id')
  async getAddress(@Param('user_id') user_id: number) {
    const result = this.addressService.getAddress(user_id);
    return result;
  }

  @ApiOperation({ summary: '기본주소 설정 변경 라우터' })
  @Put(':user_id')
  async changeBasicAddress(
    @Param('user_id') user_id: number,
    @Body('address_id') address_id: number,
  ) {
    console.log(address_id);
    const result = this.addressService.changeBasicAddress(user_id, address_id);
    return result;
  }

  @ApiOperation({ summary: '배송지 삭제 라우터' })
  @Delete('')
  async deleteAddress(@Body('address_id') address_id: number[]) {
    const result = this.addressService.deleteAddress(address_id);
    return result;
  }
}
