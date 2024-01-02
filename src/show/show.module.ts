import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';

@Module({
  providers: [ShowService],
  controllers: [ShowController]
})
export class ShowModule {}
