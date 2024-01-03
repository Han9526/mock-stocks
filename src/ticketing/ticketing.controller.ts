import { TicketingDto } from './dto/ticketing.dto';
import { Body, Controller, Post, UseGuards, Param, Get } from '@nestjs/common';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { AuthGuard } from '@nestjs/passport';
import { TicketingService } from './ticketing.service';
import { User } from './../user/entities/user.entity';
@Controller('ticketing')
export class TicketingController {
  constructor(private readonly ticketingService: TicketingService) {}

  //  예매하기
  @UseGuards(AuthGuard('jwt'))
  @Post(':showId')
  async ticketing(
    @Body() ticketingDto: TicketingDto,
    @UserInfo() user: User,
    @Param('showId') showId: number,
  ) {
    return await this.ticketingService.ticketing(
      showId,
      user.userId,
      ticketingDto.date,
      ticketingDto.seat,
    );
  }
  // 나의 예매 내역
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async ticketingList(@UserInfo() user: User) {
    return await this.ticketingService.ticketingList(user.userId);
  }
}
