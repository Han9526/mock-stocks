import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TicketingDto {
  @IsString()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요' })
  date: string;

  @IsNumber()
  @IsNotEmpty({ message: '예매 할 좌석를 입력해주세요.' })
  seat: number;
}
