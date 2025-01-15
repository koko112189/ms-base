import { Injectable } from "@nestjs/common";
import { ExampleEntity } from "src/data-provider/entities/example.entity";
import { exampleDto } from "../dto/item/item.dto";
import { ResponseService } from "../dto/response-service.dto";

@Injectable()
export abstract class IExampleDto {
    abstract findAll(): Promise<ExampleEntity[]>;
    abstract findById(id: string): Promise<ExampleEntity>;
    abstract update(id: string, item: exampleDto): Promise<ResponseService<any>>;
}