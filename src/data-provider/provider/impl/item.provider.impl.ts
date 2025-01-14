import { Injectable, NotFoundException } from "@nestjs/common";
import { IItemProvider } from "../item.provider";
import { ItemEntity } from "src/data-provider/entities/item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemDto } from "src/controller/dto/item/item.dto";
import { InventoryEntity } from "src/data-provider/entities/inventory.entity";
import { ItemUpdateDto } from "src/controller/dto/item/itemUpdate.dto";

@Injectable()
export class ItemProvider implements IItemProvider {
    constructor(@InjectRepository(ItemEntity) private itemRepository: Repository<ItemEntity>,@InjectRepository(InventoryEntity) private inventoryRepository: Repository<InventoryEntity>) { }

    async findAll(): Promise<ItemEntity[]> {
        return await this.itemRepository.find({ relations: ['category', 'inventory'] });
    }

    async finById(id: string): Promise<ItemEntity> {
        return await this.itemRepository.findOne({ where: { id }, relations: ['category', 'inventory'] });
    }

    async update(id: string, item: ItemUpdateDto): Promise<ItemEntity> {
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
    }
}