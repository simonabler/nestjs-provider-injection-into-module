import { Inject, Injectable } from '@nestjs/common';
import { MyInjectableService } from './interfaces/my-injectable-service.interface';
import { INJECTABLE_SERVICE } from './my-lib.constant';

@Injectable()
export class MyLibService {
  constructor(
    @Inject(INJECTABLE_SERVICE)
    private injectionService: MyInjectableService,
  ) {
    injectionService.findAll();
  }
}
