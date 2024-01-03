import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ticketing } from './entities/ticketing.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TicketingService {
  constructor(
    @InjectRepository(Ticketing)
    private ticketingRepository: Repository<Ticketing>,
  ) {}

  async ticketing(showId: number, userId: number, date: string, seat: number) {
    const createdTicketing = await this.ticketingRepository.save({
      showId,
      userId,
      date,
      seat,
    });
    return { createdTicketing };
  }
  async ticketingList(userId: number) {
    const getTicketingList = await this.ticketingRepository.find({
      where: { userId: userId },
      relations: ['show', 'show.showDetail'],
    });
    return { getTicketingList };
  }
}
