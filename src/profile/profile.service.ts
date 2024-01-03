import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { User } from './../user/entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(email: string) {
    const findUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!findUser) {
      throw new UnauthorizedException('로그인 후 이용해 주세요');
    }
    const findProfile = await this.profileRepository.findOne({
      where: { userId: findUser.userId },
    });
    return { findProfile, findUser };
  }
}
