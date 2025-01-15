import { Injectable } from "@nestjs/common";
import { exampleDto } from "src/controller/dto/item/item.dto";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { ExampleEntity } from "src/data-provider/entities/example.entity";

@Injectable()
export abstract class IExampleUc {
    abstract findAll(): Promise<ExampleEntity[]>;
    abstract finById(id: string): Promise<ExampleEntity>;
    abstract update(id: string, item: exampleDto): Promise<ResponseService>;
}