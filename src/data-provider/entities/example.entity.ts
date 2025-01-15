import { isNotEmpty, IsNotEmpty, Min } from "class-validator"
import {  Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "./base.entity"


@Entity('items')
export class ExampleEntity extends BaseEntity {

    @Column({type: 'varchar', length: 100})
    @IsNotEmpty()
    name: string
    @Column({type: 'text', nullable: true})
    description: string
}