import { Injectable } from "@nestjs/common";
import {  TransactionDto } from "src/controller/dto/item/transaction.dto";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { TransactionEntity } from "src/data-provider/entities/transaction.entity";

@Injectable()
export abstract class ITransactionUc {
    abstract create(transaction: TransactionDto): Promise<ResponseService<TransactionEntity>>;
       abstract findById(id: string): Promise<TransactionEntity | null>;
       abstract updateStatus(id: string, status: string): Promise<ResponseService<TransactionEntity>>;
}