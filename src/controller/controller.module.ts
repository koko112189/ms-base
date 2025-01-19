import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { CoreModule } from 'src/core/core.module';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { ITransactionService } from './service/transaction.service';
import { TransactionService } from './service/impl/transaction.service.impl';
import { IMessageService } from './service/message.service';
import { MessageService } from './service/impl/message.service.impl';

@Module({
    imports: [CoreModule, DataProviderModule],
    controllers: [TransactionController],
    providers: [
        { provide: ITransactionService, useClass: TransactionService },
        { provide: IMessageService, useClass: MessageService }
    ]
})
export class ControllerModule { }
