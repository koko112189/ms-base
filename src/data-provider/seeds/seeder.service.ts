import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { ItemEntity } from "../entities/item.entity";
import { InventoryEntity } from "../entities/inventory.entity";
import { Repository } from "typeorm";
import { CategorySeedData, generateRandomCategory, generateRandomInventory, generateRandomItem, InventorySeedData, ItemSeedData } from "./default-seed.seed";
import { randomUUID } from "crypto";

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
    @InjectRepository(InventoryEntity)
    private inventoryRepository: Repository<InventoryEntity>
  ) { }
  async seed() {
    console.log('Seeding data');
    await this.seedCategories();
    await this.seedItems();
    await this.seedInventory();
  }

  private async seedCategories() {
    for (let i = 0; i < 10; i++) { // Seed 10 categories
      const categoryData = generateRandomCategory();
      const exists = await this.categoryRepository.findOne({ where: { code: categoryData.code } });
      if (!exists) {
        await this.categoryRepository.save(categoryData);
      }
    }
  }

  private async seedItems() {
    const categories = await this.categoryRepository.find();
    for (let i = 0; i < 50; i++) { // Seed 50 items
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const itemData = generateRandomItem(randomCategory);
      const exists = await this.itemRepository.findOne({ where: { sku: itemData.sku } });
      if (!exists) {
        await this.itemRepository.save(itemData);
      }
    }
  }

  private async seedInventory() {
    const items = await this.itemRepository.find();
    for (const item of items) { // Seed inventory for each item
      const inventoryData = generateRandomInventory(item);
      const exists = await this.inventoryRepository.findOne({ where: { item: { id: item.id } } });
      if (!exists) {
        await this.inventoryRepository.save(inventoryData);
      }
    }
  }
}