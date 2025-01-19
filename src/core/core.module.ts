import { Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { TransactionUcImpl } from './use-case/impl/transaction.uc.impl';
import { IMessageUc } from './use-case/message.uc';
import { MessageUcimpl } from './use-case/impl/message.uc.impl';
import { IServiceErrorUc } from './use-case/service-error.resource.uc';
import { ServiceErrorUcimpl } from './use-case/impl/service-error.resource.uc.impl';
import { ServiceTracingUcimpl } from './use-case/impl/service-tracing.resource.uc.impl';
import { IServiceTracingUc } from './use-case/service-tracing.resource.uc';
import { ITransactionUc } from './use-case/transaction.uc';

@Module({
    imports: [DataProviderModule],
    providers: [
        { provide: ITransactionUc, useClass: TransactionUcImpl},
        { provide: IMessageUc, useClass: MessageUcimpl},
        { provide: IServiceErrorUc, useClass: ServiceErrorUcimpl},
        { provide: IServiceTracingUc, useClass: ServiceTracingUcimpl},
    ],
    exports: [ITransactionUc, IMessageUc, IServiceErrorUc, IServiceTracingUc]})
export class CoreModule {
    
}
