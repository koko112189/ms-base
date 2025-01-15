import { Injectable } from "@nestjs/common";
import { IExampleDto } from "../example.service";
import { ExampleEntity } from "src/data-provider/entities/example.entity";
import { IExampleUc } from "src/core/use-case/item.uc";
import { exampleDto } from "src/controller/dto/item/item.dto";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { EmessageMapping } from "src/common/utils/enums/message.enum";

@Injectable()
export class ItemService implements IExampleDto {

    constructor(private readonly itemUc: IExampleUc) { }

    async findAll(): Promise<ExampleEntity[]> {
        return await this.itemUc.findAll();
    }
    async findById(id: string): Promise<ExampleEntity> {
        return await this.itemUc.finById(id);
    }
    async update(id: string, item: exampleDto): Promise<ResponseService<any>> {
        return await this.itemUc.update(id, item);
    }

}