import { isNotEmpty, IsNotEmpty, Min } from "class-validator"
import {  Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "./base.entity"
import { CategoryEntity } from "./category.entity"
import { InventoryEntity } from "./inventory.entity"

@Entity('items')
export class ItemEntity extends BaseEntity {
    @Column({ unique: true })
    @IsNotEmpty()
    sku: string
    @Column({type: 'varchar', length: 100})
    @IsNotEmpty()
    name: string
    @Column({type: 'text', nullable: true})
    description: string
    @ManyToOne(() => CategoryEntity, category => category.items)
    category: CategoryEntity
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @Min(0)
    basePrice: number
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @Min(0)
    costPrice: number
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    discountProce?: number
    
    @OneToOne(() => InventoryEntity, inventory => inventory.item)
    inventory: InventoryEntity;
}