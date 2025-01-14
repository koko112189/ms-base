import { Injectable } from "@nestjs/common";
import { IItemUc } from "../item.uc";
import { ItemEntity } from "src/data-provider/entities/item.entity";
import { IItemProvider } from "src/data-provider/provider/item.provider";
import { ItemDto } from "src/controller/dto/item/item.dto";

@Injectable()
export class ItemUcImpl implements IItemUc{

    constructor(public readonly itemProvider: IItemProvider) { }
    async findAll(): Promise<ItemEntity[]> {
        try {
            return await this.itemProvider.findAll();
        } catch (error) {
            throw error;
        }
    }
    async update(id: string, item: ItemDto): Promise<ItemEntity> {
        try {
            return await this.itemProvider.update(id, item);
        } catch (error) {
            
        }
    }
}