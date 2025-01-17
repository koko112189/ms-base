import { isNotEmpty, IsNotEmpty, Min } from "class-validator"
import {  Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "./base.entity"
import { ShippingAddressEntity } from "./shipping-addres.entity";
import { BillingAddressEntity } from "./billing-addres.entity";


@Entity('customer')
export class CustomerEntity extends BaseEntity {

    @Column()
    fullName: string;
  
    @Column()
    email: string;
  
    @Column()
    phoneNumber: string;
  
    @Column()
    legalIdType: string; 
  
    @Column()
    legalIdNumber: string;
  
    @OneToOne(() => BillingAddressEntity, billingAddress => billingAddress.customer)
    billingAddress: BillingAddressEntity;
  
    @OneToOne(() => ShippingAddressEntity, shippingAddress => shippingAddress.customer)
    shippingAddress: ShippingAddressEntity;
}