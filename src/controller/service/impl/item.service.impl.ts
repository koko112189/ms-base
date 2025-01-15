import { Injectable } from "@nestjs/common";
import { IItemService } from "../item.service";
import { ItemEntity } from "src/data-provider/entities/item.entity";
import { IItemUc } from "src/core/use-case/item.uc";
import { ItemDto } from "src/controller/dto/item/item.dto";
import { ItemUpdateDto } from "src/controller/dto/item/itemUpdate.dto";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { EmessageMapping } from "src/common/utils/enums/message.enum";

@Injectable()
export class ItemService implements IItemService {

    constructor(private readonly itemUc: IItemUc) { }

    async findAll(): Promise<ItemEntity[]> {
        return await this.itemUc.findAll();
    }
    async findById(id: string): Promise<ItemEntity> {
        return await this.itemUc.finById(id);
    }
    async update(id: string, item: ItemUpdateDto): Promise<ResponseService<any>> {
        return await this.itemUc.update(id, item);
    }

}