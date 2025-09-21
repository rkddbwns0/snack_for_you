import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/dto/address.dto';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: '배송지 생성 라우터' })
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createAddress(@Body() createAddress: CreateAddressDto) {
    const result = this.addressService.createAddress(createAddress);
    return result;
  }
}
