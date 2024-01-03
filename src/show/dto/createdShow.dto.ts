import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatedShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연이름을 입력해주세요' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 부제를 입력해주세요.' })
  subtitle: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  place: string;

  @IsNumber()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  seat: number;

  @IsString()
  @IsNotEmpty({ message: '공연 시작 날짜를 입력해주세요.' })
  startDate: string;

  @IsString()
  @IsNotEmpty({ message: '공연 종료 날짜를 입력해주세요.' })
  endDate: string;
}
