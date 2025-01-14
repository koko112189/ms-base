import { Injectable } from "@nestjs/common";
import { ItemEntity } from "src/data-provider/entities/item.entity";
import { ItemDto } from "../dto/item/item.dto";

@Injectable()
export abstract class IItemService {

    /**
     * Busca todos los productos disponibles
     */
    abstract findAll(): Promise<ItemEntity[]>;

    abstract update(id: string, item: ItemDto): Promise<ItemEntity>;
}