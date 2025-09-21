import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from 'src/dto/address.dto';
import { AddressEntity } from 'src/entities/address.entity';
import { UserEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,

    @InjectRepository(AddressEntity)
    private readonly address: Repository<AddressEntity>,
  ) {}

  async createAddress(createAddress: CreateAddressDto) {
    try {
      const {
        user_id,
        name,
        road_name,
        detail_address,
        basic_address,
        request,
      } = createAddress;

      console.log(user_id);

      const user = await this.user.findOne({
        where: {
          user_id: user_id,
        },
      });

      if (!user) {
        throw new HttpException(
          '존재하지 않는 사용자입니다. 다시 시도해 주세요.',
          HttpStatus.NOT_FOUND,
        );
      }

      const check_basic_address = await this.address.findOne({
        where: {
          user: { user_id: user.user_id },
          basic_address: true,
        },
      });

      console.log(check_basic_address);

      if (check_basic_address) {
        check_basic_address.basic_address = false;
        await this.address.save(check_basic_address);
      }

      await this.address.save({
        user_id: { user_id: user_id },
        name: name,
        road_name: road_name,
        detail_address: detail_address,
        basic_address: basic_address,
        request: request,
      });

      return { message: '주소가 저장되었습니다.' };
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }
}
