import { Injectable } from "@nestjs/common";
import { ItemEntity } from "src/data-provider/entities/item.entity";
import { ItemDto } from "../dto/item/item.dto";
import { ItemUpdateDto } from "../dto/item/itemUpdate.dto";

@Injectable()
export abstract class IItemService {
    abstract findAll(): Promise<ItemEntity[]>;
    abstract findById(id: string): Promise<ItemEntity>;
    abstract update(id: string, item: ItemUpdateDto): Promise<ItemEntity>;
}