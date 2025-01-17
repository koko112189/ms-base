import { isNotEmpty, IsNotEmpty, Min } from "class-validator"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "./base.entity"
import { CustomerEntity } from "./customer.entity";


@Entity('billing_address')
export class BillingAddressEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => CustomerEntity, customer => customer.billingAddress)
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