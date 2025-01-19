import {  Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "./base.entity"


@Entity('items')
export class TransactionEntity extends BaseEntity {

    @Column()
    customerId: string;

    @Column()
    productId: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    state: string;
}