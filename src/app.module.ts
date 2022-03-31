import { Module } from '@nestjs/common';
import { MyLibModule } from '../libs/my-lib/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealService } from './real-service.service';

@Module({
  imports: [
    MyLibModule
    /*
    How to inject RealService as MyInjectableService into MyLibModule
    */
  ],
  controllers: [AppController],
  providers: [AppService, RealService],
})
export class AppModule {}
