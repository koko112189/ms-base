import { Injectable, NotFoundException } from "@nestjs/common";
import { ITransactionProvider } from "../transaction.provider";
import { TransactionEntity } from "src/data-provider/entities/transaction.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import GeneralUtils from "src/common/utils/general-utils";
import { Etask, EtaskDesc } from "src/common/utils/enums/task.enum";
import { TransactionDto } from "src/controller/dto/item/transaction.dto";

@Injectable()
export class TransactionProvider implements ITransactionProvider {
    constructor(@InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>) { }
    async create(transaction: TransactionDto): Promise<TransactionEntity> {
        const created_transaction = await this.transactionRepository.create(transaction);
        created_transaction.state = "PENDING";
        created_transaction.createdBy = "SYSTEM";
        created_transaction.updatedBy = "SYSTEM";
        await this.transactionRepository.save(created_transaction);
        return created_transaction;
    }
    async findById(id: string): Promise<TransactionEntity | null> {
        return await this.transactionRepository.findOne({ where: { id } });
    }
    async updateStatus(id: string, status: string): Promise<TransactionEntity> {
       try {
            const existingTransaction = await this.transactionRepository.findOne({ where: { id } });
            if (!existingTransaction) {
                throw new NotFoundException('Transaction not found');
            } 
            existingTransaction.state = status;  
            return await this.transactionRepository.save(existingTransaction);
        } catch (error) {
            GeneralUtils.assignTaskError(error, Etask.UPDATE, EtaskDesc.UPDATE);
            throw error;
        }
    }
}