import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { get } from "http";
import { ITransactionService } from "./service/transaction.service";
import { TransactionEntity } from "src/data-provider/entities/transaction.entity";
import GeneralUtils from "src/common/utils/general-utils";
import { Etask, EtaskDesc } from "src/common/utils/enums/task.enum";
import { TransactionDto } from "./dto/item/transaction.dto";

@ApiTags('Order')
@Controller('Order')
export class TransactionController {

    constructor(private readonly transactionService: ITransactionService){}

    // @Get()
    // @ApiOperation({ summary: 'Get all items products' })
    // async findAll() {
    //     return this.transactionService();
    // }
    @Post()
    @ApiOperation({ summary: 'Create item product' })
    async create(@Body() transaction: TransactionDto) {
        return this.transactionService.create(transaction);
    }
    
    @Get('/:id')
    @ApiOperation({ summary: 'Get item product' })
    async findById(@Query('id') id: string) {
        return this.transactionService.findById(id);
    }
    
    @Put()
    @ApiOperation({ summary: 'Update stock product' })
    
    async update(@Query('id') id: string, @Query('status') status: string) {

        return this.transactionService.updateStatus(id, status);

    }
}