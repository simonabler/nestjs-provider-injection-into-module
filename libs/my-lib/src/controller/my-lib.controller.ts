import { Controller, Get, Inject } from '@nestjs/common';
import { MyInjectableService } from '../interfaces/my-injectable-service.interface';
import { INJECTABLE_SERVICE } from '../my-lib.constant';

@Controller('lib')
export class MyLibController {

    constructor(
        @Inject(INJECTABLE_SERVICE)
        private injectionService: MyInjectableService
        ) { }

    @Get()
    getTest() {
        return this.injectionService.findAll();
    }
}
