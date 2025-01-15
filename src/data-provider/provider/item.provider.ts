import { Injectable } from "@nestjs/common";
import { ExampleEntity } from "../entities/example.entity";
import { exampleDto } from "src/controller/dto/item/item.dto";

@Injectable()
export abstract class IExampleProvider {
    abstract findAll(): Promise<ExampleEntity[]>
    abstract finById(id: string): Promise<ExampleEntity>;
    abstract update(id: string, item: exampleDto): Promise<ExampleEntity>
}