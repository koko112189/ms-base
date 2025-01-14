import { Injectable } from "@nestjs/common";
import { ItemEntity } from "../entities/item.entity";
import { ItemDto } from "src/controller/dto/item/item.dto";

@Injectable()
export abstract class IItemProvider {
    abstract findAll(): Promise<ItemEntity[]>
    abstract update(id: string, item: ItemDto): Promise<ItemEntity>
}