import { Injectable } from "@nestjs/common";
import { TransactionEntity } from "src/data-provider/entities/transaction.entity";
import {  TransactionDto } from "../dto/item/transaction.dto";
import { ResponseService } from "../dto/response-service.dto";

@Injectable()
export abstract class ITransactionService {
    abstract create(transaction: TransactionDto): Promise<ResponseService<TransactionEntity>>;
    abstract findById(id: string): Promise<TransactionEntity | null>;
    abstract updateStatus(id: string, status: string): Promise<ResponseService<TransactionEntity>>;
}