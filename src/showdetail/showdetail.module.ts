import { Module } from '@nestjs/common';
import { ShowdetailService } from './showdetail.service';
import { ShowdetailController } from './showdetail.controller';

@Module({
  providers: [ShowdetailService],
  controllers: [ShowdetailController]
})
export class ShowdetailModule {}
