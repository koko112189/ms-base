import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { get } from "http";
import { IExampleDto } from "./service/example.service";
import { ExampleEntity } from "src/data-provider/entities/example.entity";
import { exampleDto } from "./dto/item/item.dto";
import GeneralUtils from "src/common/utils/general-utils";
import { Etask, EtaskDesc } from "src/common/utils/enums/task.enum";

@ApiTags('Item')
@Controller('item')
export class ExampleController {

    constructor(private readonly itemService: IExampleDto){}

    @Get()
    @ApiOperation({ summary: 'Get all items products' })
    async findAll() {
        return this.itemService.findAll();
    }
    
    @Get('/:id')
    @ApiOperation({ summary: 'Get item product' })
    async findById(@Query('id') id: string) {
        return this.itemService.findById(id);
    }
    
    @Put()
    @ApiOperation({ summary: 'Update stock product' })
    @ApiBody({ type: exampleDto })
    /**
     * Update stock product
     * @param id item id
     * @param item stock object to update
     * @returns updated item
     * @throws message controller: + error
     */
    async update(@Query('id') id: string, @Body() item: exampleDto) {

        return this.itemService.update(id, item);

    }
}