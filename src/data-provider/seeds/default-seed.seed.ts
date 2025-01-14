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
      categoryId: 'ELECTRONICS2',
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
      categoryId: 'CLOTHING2',
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