import { Injectable } from "@nestjs/common";
import { TransactionEntity } from "../entities/transaction.entity";
import {  TransactionDto } from "src/controller/dto/item/transaction.dto";

@Injectable()
export abstract class ITransactionProvider {
    abstract create(transaction: TransactionDto): Promise<TransactionEntity>;
           abstract findById(id: string): Promise<TransactionEntity | null>;
           abstract updateStatus(id: string, status: string): Promise<TransactionEntity>;
}