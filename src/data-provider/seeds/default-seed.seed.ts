import { randomUUID } from "crypto";
import { CategoryEntity } from "../entities/category.entity";
import { ItemEntity } from "../entities/item.entity";

export const CategorySeedData = [
    {
      code: 'ELECTRONICS2',
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      createdBy: 'John Doe',
      updatedBy: 'John Doe'
    },
    {
      code: 'CLOTHING2',
      name: 'Clothing',
      description: 'Apparel and accessories',
      createdBy: 'John Doe',
      updatedBy: 'John Doe'
    }
  ];
  
  export const ItemSeedData = [
    {
      sku: 'ELEC-001',
      name: 'Smartphone X',
      description: 'Latest smartphone model',
      basePrice: 599.99,
      costPrice: 399.99,
      isActive: true,
      createdBy: 'John Doe',
      updatedBy: 'John Doe'
    },
    {
      sku: 'CLO-001',
      name: 'T-Shirt Basic',
      description: 'Cotton basic t-shirt',
      basePrice: 19.99,
      costPrice: 5.99,
      isActive: true,
      createdBy: 'John Doe',
      updatedBy: 'John Doe'
    }
  ];
  
  export const InventorySeedData = [
    {
      currentStock: 100,
      warehouseLocation: 'MAIN-A1',
      createdBy: 'John Doe',
      updatedBy: 'John Doe'
    },
    {
      currentStock: 50,
      warehouseLocation: 'MAIN-B1',
      createdBy: 'John Doe',
      updatedBy: 'John Doe'
    }
  ];

  export const generateRandomCategory = () => {
    return {
      code: randomUUID(),
      name: 'fake cat' + randomUUID(),
      description: 'lorem ipsum',
      priority: 0,
      isActive: true,
      createdBy: 'Seeder',
      updatedBy: 'Seeder',
    };
  };
  
  export const generateRandomItem = (category: CategoryEntity) => {
    return {
      sku: randomUUID(),
      name: 'fake name' + randomUUID(),
      description: 'lorem ipsum',
      basePrice: Math.floor(Math.random() * 1000), // 0-999
      costPrice: Math.floor(Math.random() * 800),  // 0-799
      discountPrice: Math.floor(Math.random() * 500), // 0-499
      category: category,
      isActive: true,
      createdBy: 'Seeder',
      updatedBy: 'Seeder',
    };
  };
  
  export const generateRandomInventory = (item: ItemEntity) => {
    return {
      currentStock: Math.floor(Math.random() * 100), // 0-99
      warehouseLocation: 'fake location' + randomUUID(),
      item: item,
      isActive: true,
      createdBy: 'Seeder',
      updatedBy: 'Seeder',
    };
  };