import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { get } from "http";
import { IItemService } from "./service/item.service";
import { ItemEntity } from "src/data-provider/entities/item.entity";
import { ItemDto } from "./dto/item/item.dto";

@ApiTags('Item')
@Controller('item')
export class ItemController {

    constructor(private readonly itemService: IItemService){}

    @Get()
    @ApiOperation({ summary: 'Get all items products' })
    async findAll() {
        return this.itemService.findAll();
    } 
    
    @Put()
    @ApiOperation({ summary: 'Update item product' })
    @ApiBody({ type: ItemDto })
    async update(@Query('id') id: string,@Body() item: ItemDto) {
        try {
            return this.itemService.update(id, item);
        } catch (error) {
            throw error;
        }
    }
}