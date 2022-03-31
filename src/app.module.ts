import { Module } from '@nestjs/common';
import { MyLibModule } from '../libs/my-lib/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealService } from './db_provider/real-service.service';
import { DbProviderModule } from './db_provider/db_provider.module';

@Module({
  imports: [
    MyLibModule.registerAsync({
          useFactory: (configService:RealService) => {
            console.log("test")
            return configService;
          },
          inject: [RealService],
          imports: [DbProviderModule]
        }),
    DbProviderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
