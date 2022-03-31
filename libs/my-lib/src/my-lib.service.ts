import { Injectable } from '@nestjs/common';
import { MyInjectableService } from './interfaces/my-injectable-service.interface';

@Injectable()
export class MyLibService {


    constructor(
        injectionService: MyInjectableService
    ) {
        injectionService.findAll();
    }

}
