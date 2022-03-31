import { ModuleMetadata, Type } from "@nestjs/common";

export interface MyInjectableService {
    createEntry()
    findAll()
}


export interface MyInjectableAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<MyInjectableOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<MyInjectableService> | MyInjectableService;
}

export interface MyInjectableOptionsFactory {
    createMyInjectableOptions():
      | Promise<MyInjectableService>
      | MyInjectableService;
}