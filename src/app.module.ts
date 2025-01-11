import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ControllerModule } from './controller/controller.module';
import { CoreModule } from './core/core.module';
import { DataProviderModule } from './data-provider/data-provider.module';


@Module({
  imports: [CommonModule, ControllerModule, CoreModule, DataProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
