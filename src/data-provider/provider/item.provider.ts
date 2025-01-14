import { Injectable } from "@nestjs/common";
import { ItemEntity } from "../entities/item.entity";
import { ItemDto } from "src/controller/dto/item/item.dto";
import { ItemUpdateDto } from "src/controller/dto/item/itemUpdate.dto";

@Injectable()
export abstract class IItemProvider {
    abstract findAll(): Promise<ItemEntity[]>
    abstract finById(id: string): Promise<ItemEntity>;
    abstract update(id: string, item: ItemUpdateDto): Promise<ItemEntity>
}