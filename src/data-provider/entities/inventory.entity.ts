import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity"
import { ItemEntity } from "./item.entity";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

@Entity('inventory')
export class InventoryEntity extends BaseEntity {
    @OneToOne(() => ItemEntity, item => item.inventory)
    @JoinColumn()
    item: ItemEntity;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    currentStock: number;

    @Column({ type: 'varchar', length: 100 })
    warehouseLocation: string;
}