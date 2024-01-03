import { compare, hash } from 'bcrypt';
import { isNil } from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    name: string,
    description: string | null,
    phone: string,
    imgUrl: string | null,
  ) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(password, 10);
    // 트랜잭션 적용 시켜보자 나중에
    const createdUser = await this.userRepository.save({
      email,
      password: hashedPassword,
    });

    const createdProfile = await this.profileRepository.save({
      userId: createdUser.userId,
      imgUrl,
      name,
      description,
      phone,
    });

    return { data: createdProfile, createdUser };
  }

  async signin(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['userId', 'email', 'password'],
      where: { email },
    });
    console.log(user);
    if (isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, userId: user.userId };

    console.log(
      '🚀 ~ file: user.service.ts:78 ~ UserService ~ signin ~ payload:',
      payload,
    );
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
