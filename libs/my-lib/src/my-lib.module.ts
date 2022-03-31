import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MyLibController } from './controller/my-lib.controller';
import {
  MyInjectableAsyncOptions,
  MyInjectableOptionsFactory,
} from './interfaces/async-options.interface';
import { INJECTABLE_SERVICE } from './my-lib.constant';
import { MyLibService } from './my-lib.service';

@Module({
  controllers: [MyLibController],
  providers: [MyLibService],
  exports: [MyLibService],
})
export class MyLibModule {
  public static registerAsync(
    connectOptions: MyInjectableAsyncOptions,
  ): DynamicModule {
    return {
      module: MyLibModule,
      imports: connectOptions.imports || [],
      providers: [this.createConnectAsyncProviders(connectOptions)],
    };
  }

  private static createConnectAsyncProviders(
    options: MyInjectableAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: INJECTABLE_SERVICE,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    // For useClass and useExisting...
    return {
      provide: INJECTABLE_SERVICE,
      useFactory: async (optionsFactory: MyInjectableOptionsFactory) =>
        await optionsFactory.createMyInjectableOptions(),
      inject: [options.useExisting],
    };
  }
}
