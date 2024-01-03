import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketingService } from './ticketing.service';
import { TicketingController } from './ticketing.controller';
import { Ticketing } from 'src/ticketing/entities/ticketing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticketing])],
  providers: [TicketingService],
  controllers: [TicketingController],
  exports: [TicketingService],
})
export class TicketingModule {}
