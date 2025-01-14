import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { CoreModule } from 'src/core/core.module';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IItemService } from './service/item.service';
import { ItemService } from './service/impl/item.service.impl';

@Module({
    imports: [CoreModule, DataProviderModule],
    controllers: [ItemController],
    providers: [
        { provide: IItemService, useClass: ItemService },
    ]
})
export class ControllerModule { }
