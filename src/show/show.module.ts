import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { Show } from './entities/show.entity';
import { ShowDetail } from './../showdetail/entities/showdetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, ShowDetail])],
  providers: [ShowService],
  controllers: [ShowController],
  exports: [ShowService],
})
export class ShowModule {}
