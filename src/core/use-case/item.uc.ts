import { Injectable } from "@nestjs/common";
import { ItemDto } from "src/controller/dto/item/item.dto";
import { ItemUpdateDto } from "src/controller/dto/item/itemUpdate.dto";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { ItemEntity } from "src/data-provider/entities/item.entity";

@Injectable()
export abstract class IItemUc {
    abstract findAll(): Promise<ItemEntity[]>;
    abstract finById(id: string): Promise<ItemEntity>;
    abstract update(id: string, item: ItemUpdateDto): Promise<ResponseService>;
}