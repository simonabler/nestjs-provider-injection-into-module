import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDatabaseProviderModule } from '../providers/database/mongo/provider.module';
import { RealService } from './real-service.service';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongoDatabaseProviderModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [RealService],
  exports: [RealService],
})
export class DbProviderModule {}
