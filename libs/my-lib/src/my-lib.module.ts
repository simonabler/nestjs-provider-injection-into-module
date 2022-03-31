import { Module } from '@nestjs/common';
import { MyLibController } from './controller/my-lib.controller';
import { MyLibService } from './my-lib.service';

@Module({
  controllers:[MyLibController],
  providers: [MyLibService],
  exports: [MyLibService],
})
export class MyLibModule {}
