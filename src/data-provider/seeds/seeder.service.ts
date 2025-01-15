import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExampleEntity } from "../entities/example.entity";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { generateRandomExample } from "./default-seed.seed";

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(ExampleEntity)
    private itemRepository: Repository<ExampleEntity>,

  ) { }
  async seed() {
    console.log('Seeding data');
    await this.seedItems();
  }
  
  private async seedItems() {
    for (let i = 0; i < 2; i++) { // Seed 50 items
      const itemData = generateRandomExample();
      const exists = await this.itemRepository.findOne({ where: { name: itemData.name } });
      if (!exists) {
        await this.itemRepository.save(itemData);
      }
    }
  }
}