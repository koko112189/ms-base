import { Injectable } from "@nestjs/common";
import { ItemDto } from "src/controller/dto/item/item.dto";
import { ItemEntity } from "src/data-provider/entities/item.entity";

@Injectable()
export abstract class IItemUc {
    abstract findAll(): Promise<ItemEntity[]>;
    abstract update(id: string, item: ItemDto): Promise<ItemEntity>;
}