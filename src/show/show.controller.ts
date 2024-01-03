import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from './../user/entities/user.entity';
import { ShowService } from './show.service';
import { CreatedShowDto } from './dto/createdShow.dto';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  //   공연등록
  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async createShow(
    @Body() createdShowDto: CreatedShowDto,
    @UserInfo() user: User,
  ) {
    return await this.showService.createShow(
      user.userId,
      createdShowDto.title,
      createdShowDto.subtitle,
      createdShowDto.place,
      createdShowDto.seat,
      createdShowDto.startDate,
      createdShowDto.endDate,
    );
  }
  //   공연 목록 보기
  @Get('list')
  async getShowList() {
    return await this.showService.getShowList();
  }
  //   공연 검색하기
  @Get('search')
  async searchShows(@Query('value') searchValue: string) {
    console.log(searchValue);
    return await this.showService.searchShows(searchValue);
  }
  //   공연 상세보기
  @Get(':showId')
  async getShowDetail(@Param('showId') showId: number) {
    return await this.showService.getShowDetail(showId);
  }
}
