import { Module } from '@nestjs/common';
import { ExampleController } from './item.controller';
import { CoreModule } from 'src/core/core.module';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IExampleDto } from './service/example.service';
import { ItemService } from './service/impl/item.service.impl';
import { IMessageService } from './service/message.service';
import { MessageService } from './service/impl/message.service.impl';

@Module({
    imports: [CoreModule, DataProviderModule],
    controllers: [ExampleController],
    providers: [
        { provide: IExampleDto, useClass: ItemService },
        { provide: IMessageService, useClass: MessageService }
    ]
})
export class ControllerModule { }
