import { isNotEmpty, IsNotEmpty, Min } from "class-validator"
import {  Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "./base.entity"
import { BillingAddressEntity } from "./billing-addres.entity";
import { CustomerEntity } from "./customer.entity";


@Entity('shipping_address')
export class ShippingAddressEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => CustomerEntity, customer => customer.shippingAddress)
    @JoinColumn()
    customer: CustomerEntity;
  
    @Column()
    addressLine1: string;
  
    @Column({ nullable: true })
    addressLine2: string;
  
    @Column()
    city: string;
  
    @Column()
    region: string;
  
    @Column()
    country: string;
  
    @Column()
    postalCode: string;
}