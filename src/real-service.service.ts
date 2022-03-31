import { Injectable } from '@nestjs/common';
import { MyInjectableService } from '../libs/my-lib/src/interfaces/my-injectable-service.interface';

@Injectable()
export class RealService implements MyInjectableService {
    
    createEntry() {
        console.log("createEntry");
        return ["createEntry"];
    }
    
    findAll() {
        console.log("findAll");
        return ["all"];
    }


}
