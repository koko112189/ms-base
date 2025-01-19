import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "../entities/transaction.entity";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { generateRandomExample } from "./default-seed.seed";

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(TransactionEntity)
    private itemRepository: Repository<TransactionEntity>,

  ) { }
  async seed() {
    console.log('Seeding data');
    await this.seedItems();
  }
  
  private async seedItems() {
 
  }
}