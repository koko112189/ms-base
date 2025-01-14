import { IsNotEmpty, IsString } from "class-validator";
import {  Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { ItemEntity } from "./item.entity";
import { BaseEntity } from "./base.entity";

@Entity('categories')
@Tree("closure-table")
export class CategoryEntity  extends BaseEntity {
    @Column({ unique: true })
    @IsNotEmpty()
    @IsString()
    code: string;

    @Column({ length: 100 })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @TreeParent()
    parent: CategoryEntity;

    @TreeChildren()
    children: CategoryEntity[];

    @OneToMany(() => ItemEntity, item => item.category)
    items: ItemEntity[];
}