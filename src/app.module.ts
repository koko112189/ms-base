import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ControllerModule } from './controller/controller.module';
import { CoreModule } from './core/core.module';
import { DataProviderModule } from './data-provider/data-provider.module';
import { ExceptionManager } from './common/lib/exceptions-manager.filter';
import { RequestHttpInterceptor } from './controller/interceptor/request-http.interceptor';


@Module({
  imports: [CommonModule, ControllerModule, CoreModule, DataProviderModule],
  controllers: [],
  providers: [{
    provide: 'APP_FILTER',
    useClass: ExceptionManager
  },
  {
    provide: 'APP_INTERCEPTOR',
    useClass: RequestHttpInterceptor
  }],
})
export class AppModule {}
