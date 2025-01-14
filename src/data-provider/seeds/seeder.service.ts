import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { ItemEntity } from "../entities/item.entity";
import { InventoryEntity } from "../entities/inventory.entity";
import { Repository } from "typeorm";
import { CategorySeedData, InventorySeedData, ItemSeedData } from "./default-seed.seed";

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>,
        @InjectRepository(ItemEntity)
        private itemRepository: Repository<ItemEntity>,
        @InjectRepository(InventoryEntity)
        private inventoryRepository: Repository<InventoryEntity>
      ) {}
    async seed() {
        console.log('Seeding data');
        await this.seedCategories();
        await this.seedItems();
        await this.seedInventory();
    }

    private async seedCategories() {
        const items = await this.itemRepository.find();
        for (let i = 0; i < items.length; i++) {
          const categoryData = CategorySeedData[i];
          if (categoryData) {
            const exists = await this.categoryRepository.findOne({ where: { items: { id: items[i].id }}});
            if (!exists) {
              await this.categoryRepository.save({ ...categoryData, item: items[i] });
            }
          }
        }
        // for (const category of CategorySeedData) {
        //   const exists = await this.categoryRepository.findOne({ where: { code: category.code } });
        //   if (!exists) {
        //     await this.categoryRepository.save(category);
        //   }
        // }
      }
    
      private async seedItems() {
        for (const item of ItemSeedData) {
          const exists = await this.itemRepository.findOne({ where: { sku: item.sku } });
          if (!exists) {
            await this.itemRepository.save(item);
          }
        }
      }
    
      private async seedInventory() {
        const items = await this.itemRepository.find();
        for (let i = 0; i < items.length; i++) {
          const inventoryData = InventorySeedData[i];
          if (inventoryData) {
            const exists = await this.inventoryRepository.findOne({ 
              where: { item: { id: items[i].id } } 
            });
            if (!exists) {
              await this.inventoryRepository.save({
                ...inventoryData,
                item: items[i]
              });
            }
          }
        }
      }
}