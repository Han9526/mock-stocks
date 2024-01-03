import { UserInfo } from 'src/utils/userInfo.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './../user/entities/user.entity';
import { ProfileService } from './profile.service';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async getProfile(@UserInfo() user: User) {
    return await this.profileService.getProfile(user.email);
  }
}
