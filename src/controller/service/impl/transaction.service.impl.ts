import { Injectable } from "@nestjs/common";
import { ITransactionService } from "../transaction.service";
import { TransactionEntity } from "src/data-provider/entities/transaction.entity";
import {  TransactionDto } from "src/controller/dto/item/transaction.dto";
import { ITransactionUc } from "src/core/use-case/transaction.uc";
import { ResponseService } from "src/controller/dto/response-service.dto";

@Injectable()
export class TransactionService implements ITransactionService {

    constructor(private readonly transactionUc: ITransactionUc) { }
    async create(transaction: TransactionDto): Promise<ResponseService<TransactionEntity>> {
        return await this.transactionUc.create(transaction);
    }
    findById(id: string): Promise<TransactionEntity | null> {
        return this.transactionUc.findById(id);
    }
    async updateStatus(id: string, status: string): Promise<ResponseService<TransactionEntity>> {
       return await this.transactionUc.updateStatus(id, status);
    }

}