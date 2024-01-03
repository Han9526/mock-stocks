import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;

  @IsOptional()
  @IsString()
  imgUrl: string | null;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsString()
  @IsNotEmpty({ message: '전화번호를 입력해주세요.' })
  phone: string;
}
