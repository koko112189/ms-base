import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CoreModule } from 'src/core/core.module';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { ICustomerService } from './service/customer.service';
import { ItemService } from './service/impl/customer.service.impl';
import { IMessageService } from './service/message.service';
import { MessageService } from './service/impl/message.service.impl';

@Module({
    imports: [CoreModule, DataProviderModule],
    controllers: [CustomerController],
    providers: [
        { provide: ICustomerService, useClass: ItemService },
        { provide: IMessageService, useClass: MessageService }
    ]
})
export class ControllerModule { }
