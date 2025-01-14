import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { get } from "http";
import { IItemService } from "./service/item.service";
import { ItemEntity } from "src/data-provider/entities/item.entity";
import { ItemDto } from "./dto/item/item.dto";
import { ItemUpdateDto } from "./dto/item/itemUpdate.dto";

@ApiTags('Item')
@Controller('item')
export class ItemController {

    constructor(private readonly itemService: IItemService){}

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
    @ApiBody({ type: ItemUpdateDto })
    /**
     * Update stock product
     * @param id item id
     * @param item stock object to update
     * @returns updated item
     * @throws message controller: + error
     */
    async update(@Query('id') id: string,@Body() item: ItemUpdateDto) {
        
        try {
            return this.itemService.update(id, item);
        } catch (error) {
            throw "message controller:" + error;
            
        }
    }
}