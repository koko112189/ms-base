import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { get } from "http";
import { ICustomerService } from "./service/customer.service";
import { CustomerEntity } from "src/data-provider/entities/customer.entity";
import GeneralUtils from "src/common/utils/general-utils";
import { Etask, EtaskDesc } from "src/common/utils/enums/task.enum";
import { CustomerDataDto } from "./dto/customer/customer.dto";

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: ICustomerService){}

    @Get()
    @ApiOperation({ summary: 'Get all customers' })
    async findAll() {
        return this.customerService.findAll();
    }
    
    @Get('/:id')
    @ApiOperation({ summary: 'Get customer by id' })
    async findById(@Query('id') id: string) {
        return this.customerService.findById(id);
    }
    
    @Put()
    @ApiOperation({ summary: 'Update customer' })
    @ApiBody({ type: CustomerDataDto })
    async update(@Query('id') id: string, @Body() customer: CustomerDataDto) {
        return this.customerService.update(id, customer);
    }

    @Post()
    @ApiOperation({ summary: 'Create customer' })
    @ApiBody({ type: CustomerDataDto })
    async create(@Body() customer: CustomerDataDto) {
        return this.customerService.create(customer);
    }
}