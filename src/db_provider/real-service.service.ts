import { Injectable } from '@nestjs/common';
import { MyInjectableAsyncOptions, MyInjectableOptionsFactory, MyInjectableService } from '../../libs/my-lib/src/interfaces/my-injectable-service.interface';

@Injectable()
export class RealService implements MyInjectableService, MyInjectableOptionsFactory {
    
    
    createMyInjectableOptions(): MyInjectableService | Promise<MyInjectableService> {
        return this;
    }
    
    createEntry() {
        console.log("createEntry");
        return ["createEntry"];
    }
    
    findAll() {
        console.log("findAll");
        return ["all"];
    }


}
