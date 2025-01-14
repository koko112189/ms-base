import { Injectable, NotFoundException } from "@nestjs/common";
import { IItemProvider } from "../item.provider";
import { ItemEntity } from "src/data-provider/entities/item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemDto } from "src/controller/dto/item/item.dto";
import { InventoryEntity } from "src/data-provider/entities/inventory.entity";

@Injectable()
export class ItemProvider implements IItemProvider {
    constructor(@InjectRepository(ItemEntity) private itemRepository: Repository<ItemEntity>) { }

    async findAll(): Promise<ItemEntity[]> {
        return await this.itemRepository.find({ relations: ['category', 'inventory'] });
    }
    async update(id: string, item: ItemDto): Promise<ItemEntity> {
        // const _item = await this.itemRepository.findOne({
        //     where: { id },
        //     relations: ['category', 'inventory'],
        // });

        // if (_item.category.id) {
        //     const category = await this.categoriaRepository.findOne({
        //       where: { id: updateProductDto.categoriaId },
        //     });
      
        //     if (!category) {
        //       throw new NotFoundException('Categoría no encontrada');
        //     }
      
        //     product.categoria = category;
        //   }

        // if (!_item) {
        //     throw new NotFoundException('ítem no encontrado');
        // }
        // const itemToUpdate: Partial<ItemEntity> = {
        //     ...item,
        //     inventory: item.inventory?.map(inv => Object.assign(new InventoryEntity(), inv))
        // };
        // await this.itemRepository.update(id, itemToUpdate);
        // return await this.itemRepository.findOne({ where: { id } });
        return null;
    }
}