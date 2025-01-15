import { Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IItemUc } from './use-case/item.uc';
import { ItemUcImpl } from './use-case/impl/item.uc.impl';
import { IMessageUc } from './use-case/message.uc';
import { MessageUcimpl } from './use-case/impl/message.uc.impl';
import { IServiceErrorUc } from './use-case/service-error.resource.uc';
import { ServiceErrorUcimpl } from './use-case/impl/service-error.resource.uc.impl';
import { ServiceTracingUcimpl } from './use-case/impl/service-tracing.resource.uc.impl';
import { IServiceTracingUc } from './use-case/service-tracing.resource.uc';

@Module({
    imports: [DataProviderModule],
    providers: [
        { provide: IItemUc, useClass: ItemUcImpl},
        { provide: IMessageUc, useClass: MessageUcimpl},
        { provide: IServiceErrorUc, useClass: ServiceErrorUcimpl},
        { provide: IServiceTracingUc, useClass: ServiceTracingUcimpl},
    ],
    exports: [IItemUc, IMessageUc, IServiceErrorUc, IServiceTracingUc]})
export class CoreModule {
    
}
