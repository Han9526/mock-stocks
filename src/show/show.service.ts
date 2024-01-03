import { Like, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { ShowDetail } from '../showdetail/entities/showdetail.entity';
@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(ShowDetail)
    private showDetailRepository: Repository<ShowDetail>,
  ) {}

  //   공연 등록
  async createShow(
    userId: number,
    title: string,
    subtitle: string,
    place: string,
    seat: number,
    startDate: string,
    endDate: string,
  ) {
    // 트랜잭션 적용하기
    const createdShow = await this.showRepository.save({
      userId,
      title,
    });

    const createdShowDetail = await this.showDetailRepository.save({
      showId: createdShow.showId,
      subtitle,
      place,
      seat,
      startDate,
      endDate,
    });

    return { createdShow, createdShowDetail };
  }

  //   공연 목록
  async getShowList() {
    const getShowList = await this.showRepository.find({});
    return { getShowList };
  }
  //   공연 검색
  async searchShows(searchValue: string) {
    const getSearchShows = await this.showRepository.find({
      where: {
        title: Like(`%${searchValue}%`),
      },
    });
    return getSearchShows;
  }
  // 공연 상세보기
  async getShowDetail(showId: number) {
    const getShow = await this.showRepository.findOne({
      where: { showId },
    });
    if (!getShow) {
      throw new NotFoundException('존재하지 않는 공연 입니다');
    }
    const getShowDetail = await this.showDetailRepository.findOne({
      where: { showId },
    });

    return { getShow, getShowDetail };
  }
}
