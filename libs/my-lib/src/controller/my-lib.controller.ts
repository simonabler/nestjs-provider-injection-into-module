import { Controller, Get } from '@nestjs/common';
import { MyInjectableService } from '../interfaces/my-injectable-service.interface';

@Controller('')
export class MyLibController {

    constructor(private injectionService: MyInjectableService) { }

    @Get()
    getTest() {
        return this.injectionService.findAll();
    }
}
