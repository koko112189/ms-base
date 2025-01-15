import { Injectable, NotFoundException } from "@nestjs/common";
import { IExampleProvider } from "../item.provider";
import { ExampleEntity } from "src/data-provider/entities/example.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { exampleDto } from "src/controller/dto/item/item.dto";
import { InventoryEntity } from "src/data-provider/entities/inventory.entity";
import { ItemUpdateDto } from "src/controller/dto/item/itemUpdate.dto";
import GeneralUtils from "src/common/utils/general-utils";
import { Etask, EtaskDesc } from "src/common/utils/enums/task.enum";

@Injectable()
export class ItemProvider implements IExampleProvider {
    constructor(@InjectRepository(ExampleEntity) private itemRepository: Repository<ExampleEntity>,@InjectRepository(InventoryEntity) private inventoryRepository: Repository<InventoryEntity>) { }

    async findAll(): Promise<ExampleEntity[]> {
        return await this.itemRepository.find({ relations: ['category', 'inventory'] });
    }

    async finById(id: string): Promise<ExampleEntity> {
        return await this.itemRepository.findOne({ where: { id }, relations: ['category', 'inventory'] });
    }

    async update(id: string, item: ItemUpdateDto): Promise<ExampleEntity> {
        try {
            const itemEntity = await this.itemRepository.findOne({
                where: { id },
                relations: ['inventory'], 
            });
    
            if (!itemEntity) {
                throw new NotFoundException('Item not found');
            }
    
            if (!itemEntity.inventory) {
                throw new NotFoundException('Inventory not found for this item');
            }
    
            itemEntity.inventory.currentStock = item.currentStock;
    
            await this.inventoryRepository.save(itemEntity.inventory);
    
            return itemEntity;
        } catch (error) {
            GeneralUtils.assignTaskError(error, Etask.UPDATE_ITEM, EtaskDesc.UPDATE_ITEM);
            throw error;
        }
        
    }
}