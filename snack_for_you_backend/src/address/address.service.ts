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

      console.log(createAddress);

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

      if (basic_address) {
        const check_basic_address = await this.address.findOne({
          where: {
            user: { user_id: user.user_id },
            basic_address: true,
          },
        });

        if (check_basic_address) {
          check_basic_address.basic_address = false;
          await this.address.save(check_basic_address);
        }
      }

      await this.address.save({
        user: { user_id: user_id },
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

  async getAddress(user_id: number): Promise<any> {
    try {
      const user = await this.user.findOne({
        where: {
          user_id: user_id,
        },
      });

      if (!user) {
        throw new HttpException(
          '존재하지 않는 사용자입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const result = await this.address
        .createQueryBuilder('address')
        .innerJoin('address.user', 'user')
        .select('address.address_id as address_id')
        .addSelect('address.name as name')
        .addSelect('user.user_id as user_id')
        .addSelect('address.road_name as road_name')
        .addSelect('address.detail_address as detail_address')
        .addSelect('address.basic_address as basic_address')
        .addSelect('address.request as request')
        .addSelect(
          "TO_CHAR(address.created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at",
        )
        .where('user.user_id = :user_id', { user_id: user_id })
        .orderBy('address.basic_address', 'DESC')
        .addOrderBy('address.created_at', 'DESC')
        .getRawMany();

      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteAddress(address_id: number[]) {
    try {
      await this.address.delete(address_id);
      return { message: '주소가 삭제되었습니다.' };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async changeBasicAddress(user_id: number, address_id: number) {
    try {
      const user = await this.user.findOne({
        where: { user_id: user_id },
      });

      if (!user) {
        throw new HttpException(
          '존재하지 않는 사용자입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const address = await this.address.findOne({
        where: { address_id: address_id, user: { user_id: user_id } },
      });

      if (!address) {
        throw new HttpException(
          '존재하지 않는 주소입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      const check_basic_address = await this.address.findOne({
        where: {
          user: { user_id: user.user_id },
          basic_address: true,
        },
      });

      if (check_basic_address) {
        check_basic_address.basic_address = false;
        await this.address.save(check_basic_address);
      }

      address.basic_address = true;
      await this.address.save(address);

      return { message: '기본 주소가 변경되었습니다.' };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
    }
  }

  async getBasicAddress(user_id: number) {
    try {
      const basic_address = await this.address.findOne({
        where: {
          user: { user_id: user_id },
          basic_address: true,
        },
      });

      if (!basic_address) {
        return null;
      }

      return basic_address;
    } catch (e) {
      console.error(e);
    }
  }
}
