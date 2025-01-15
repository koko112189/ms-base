import { Injectable } from "@nestjs/common";
import { IItemUc } from "../item.uc";
import { ItemEntity } from "src/data-provider/entities/item.entity";
import { IItemProvider } from "src/data-provider/provider/item.provider";
import { ItemDto } from "src/controller/dto/item/item.dto";
import { ItemUpdateDto } from "src/controller/dto/item/itemUpdate.dto";
import GeneralUtils from "src/common/utils/general-utils";
import { Etask, EtaskDesc } from "src/common/utils/enums/task.enum";
import { response } from "express";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { EmessageMapping } from "src/common/utils/enums/message.enum";

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
    async finById(id: string): Promise<ItemEntity> {
        try {
            return await this.itemProvider.finById(id);
        } catch (error) {
            throw error;
        }
    }
    async update(id: string, item: ItemUpdateDto): Promise<ResponseService> {
        try {
            const updatedItem = await this.itemProvider.update(id, item);
            return new ResponseService(true, EmessageMapping.ITEM_UPDATED, 200, updatedItem);
        } catch (error) {
            GeneralUtils.assignTaskError(error, Etask.UPDATE_ITEM, EtaskDesc.UPDATE_ITEM);
            throw error;
        }
    }
}