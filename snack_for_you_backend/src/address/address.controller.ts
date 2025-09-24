import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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

  @ApiOperation({ summary: '배송지 삭제 라우터' })
  @Delete('')
  async deleteAddress(@Body('address_id') address_id: number[]) {
    const result = this.addressService.deleteAddress(address_id);
    return result;
  }
}
