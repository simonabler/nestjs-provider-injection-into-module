import { Module } from '@nestjs/common';
import { RealService } from './real-service.service';

@Module({
    providers:[RealService],
    exports:[RealService]
})
export class DbProviderModule {}
