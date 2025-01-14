import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/common/configuration/database.config';
import { IItemProvider } from './provider/item.provider';
import { ItemProvider } from './provider/impl/item.provider.impl';
import { ItemEntity } from './entities/item.entity';
import { CategoryEntity } from './entities/category.entity';
import { InventoryEntity } from './entities/inventory.entity';
import { SeederService } from './seeds/seeder.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([ItemEntity, CategoryEntity, InventoryEntity])
    ],
    providers: [
        {provide: IItemProvider, useClass: ItemProvider},
        SeederService
    ],
    exports: [IItemProvider, SeederService]
})
export class DataProviderModule {}
