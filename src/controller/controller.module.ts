import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { CoreModule } from 'src/core/core.module';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IItemService } from './service/item.service';
import { ItemService } from './service/impl/item.service.impl';
import { IMessageService } from './service/message.service';
import { MessageService } from './service/impl/message.service.impl';

@Module({
    imports: [CoreModule, DataProviderModule],
    controllers: [ItemController],
    providers: [
        { provide: IItemService, useClass: ItemService },
        { provide: IMessageService, useClass: MessageService }
    ]
})
export class ControllerModule { }
