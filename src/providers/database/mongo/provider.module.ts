import { Module } from '@nestjs/common';
import { MongoConfigModule } from '../../../config/database/mongo/config.module';
import { MongoConfigService } from '../../../config/database/mongo/config.service';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useExisting: MongoConfigService,
    } as MongooseModuleAsyncOptions),
  ],
})
export class MongoDatabaseProviderModule {}
