import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/common/configuration/database.config';
import { ICustomerProvider } from './provider/customer.provider';
import { CustomerProvider } from './provider/impl/customer.provider.impl';
import { CustomerEntity } from './entities/customer.entity';
import { SeederService } from './seeds/seeder.service';
import { MessageEntity } from './entities/message.entity';
import { ServiceErrorEntity } from './entities/service-error.entity';
import { ServiceTracingEntity } from './entities/service-tracing.entity';
import { IMessageProvider } from './provider/message.provider';
import { MessageProvider } from './provider/impl/message.provider.impl';
import { IServiceErrorProvider } from './provider/service-error.provider';
import { ServiceErrorProvider } from './provider/impl/service-error.provider.impl';
import { IServiceTracingProvider } from './provider/service-tracing.provider';
import { ServiceTracingProvider } from './provider/impl/service-tracing.provider.impl';
import { IServiceTracingUc } from 'src/core/use-case/service-tracing.resource.uc';
import { ServiceTracingUcimpl } from 'src/core/use-case/impl/service-tracing.resource.uc.impl';
import { ShippingAddressEntity } from './entities/shipping-addres.entity';
import { BillingAddressEntity } from './entities/billing-addres.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([CustomerEntity, ShippingAddressEntity, BillingAddressEntity, MessageEntity, ServiceErrorEntity, ServiceTracingEntity])
    ],
    providers: [
        {provide: ICustomerProvider, useClass: CustomerProvider},
        {provide: IMessageProvider, useClass: MessageProvider},
        {provide: IServiceErrorProvider, useClass: ServiceErrorProvider},
        {provide: IServiceTracingProvider, useClass: ServiceTracingProvider},
        {provide: IServiceTracingUc, useClass: ServiceTracingUcimpl},
        SeederService
    ],
    exports: [ICustomerProvider, SeederService, IMessageProvider, IServiceErrorProvider, IServiceTracingProvider, IServiceTracingUc]
})
export class DataProviderModule {}
