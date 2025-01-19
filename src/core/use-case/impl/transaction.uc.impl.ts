import { Injectable } from "@nestjs/common";
import { TransactionEntity } from "src/data-provider/entities/transaction.entity";
import { ITransactionProvider } from "src/data-provider/provider/transaction.provider";
import GeneralUtils from "src/common/utils/general-utils";
import { Etask, EtaskDesc } from "src/common/utils/enums/task.enum";
import { response } from "express";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { EmessageMapping } from "src/common/utils/enums/message.enum";
import { ITransactionUc } from "../transaction.uc";
import { TransactionDto } from "src/controller/dto/item/transaction.dto";

@Injectable()
export class TransactionUcImpl implements ITransactionUc{

    constructor(public readonly transactionProvider: ITransactionProvider) { }
    async create(transaction: TransactionDto): Promise<ResponseService<TransactionEntity>> {
        try {
            const createdTransaction = await this.transactionProvider.create(transaction);
            return new ResponseService<TransactionEntity>(true, EmessageMapping.DEFAULT, 200, createdTransaction);
        } catch (error) {
            GeneralUtils.assignTaskError(error, Etask.CREATE, EtaskDesc.CREATE);
            throw error;
        }
    }
    async findById(id: string): Promise<TransactionEntity | null> {
        try {
            return await this.transactionProvider.findById(id);
        } catch (error) {
            throw error;
        }
    }
    async updateStatus(id: string, status: string): Promise<ResponseService<TransactionEntity>> {
        try {
            const updatedItem = await this.transactionProvider.updateStatus(id, status);
            return new ResponseService(true, EmessageMapping.DEFAULT, 200, updatedItem);
        } catch (error) {
            GeneralUtils.assignTaskError(error, Etask.UPDATE, EtaskDesc.UPDATE);
            throw error;
        }
    }

}