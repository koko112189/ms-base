import { Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { ICustomerUc } from './use-case/customer.uc';
import { CustomerUcImpl } from './use-case/impl/customer.uc.impl';
import { IMessageUc } from './use-case/message.uc';
import { MessageUcimpl } from './use-case/impl/message.uc.impl';
import { IServiceErrorUc } from './use-case/service-error.resource.uc';
import { ServiceErrorUcimpl } from './use-case/impl/service-error.resource.uc.impl';
import { ServiceTracingUcimpl } from './use-case/impl/service-tracing.resource.uc.impl';
import { IServiceTracingUc } from './use-case/service-tracing.resource.uc';

@Module({
    imports: [DataProviderModule],
    providers: [
        { provide: ICustomerUc, useClass: CustomerUcImpl},
        { provide: IMessageUc, useClass: MessageUcimpl},
        { provide: IServiceErrorUc, useClass: ServiceErrorUcimpl},
        { provide: IServiceTracingUc, useClass: ServiceTracingUcimpl},
    ],
    exports: [ICustomerUc, IMessageUc, IServiceErrorUc, IServiceTracingUc]})
export class CoreModule {
    
}
