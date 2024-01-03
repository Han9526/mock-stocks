import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SigninDto } from './dto/signin.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() signupDto: SignupDto) {
    return await this.userService.register(
      signupDto.email,
      signupDto.password,
      signupDto.name,
      signupDto.description,
      signupDto.phone,
      signupDto.imgUrl,
    );
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return await this.userService.signin(signinDto.email, signinDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}
