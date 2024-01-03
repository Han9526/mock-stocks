import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './../profile/entities/profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User } from 'src/user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
