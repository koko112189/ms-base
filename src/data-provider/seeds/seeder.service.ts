import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "../entities/customer.entity";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { generateRandomExample } from "./default-seed.seed";

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(CustomerEntity)
    private itemRepository: Repository<CustomerEntity>,

  ) { }
  async seed() {
    console.log('Seeding data');
    await this.seedItems();
  }
  
  private async seedItems() {
   
  }
}