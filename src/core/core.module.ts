import { Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IItemUc } from './use-case/item.uc';
import { ItemUcImpl } from './use-case/impl/item.uc.impl';

@Module({
    imports: [DataProviderModule],
    providers: [
        { provide: IItemUc, useClass: ItemUcImpl},
    ],
    exports: [IItemUc]})
export class CoreModule {
    
}
