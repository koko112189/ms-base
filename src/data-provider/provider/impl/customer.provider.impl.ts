import { Injectable, NotFoundException } from "@nestjs/common";
import { ICustomerProvider } from "../customer.provider";
import { CustomerEntity } from "src/data-provider/entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CustomerDataDto } from "src/controller/dto/customer/customer.dto";
import { BillingAddressEntity } from "src/data-provider/entities/billing-addres.entity";
import { ShippingAddressEntity } from "src/data-provider/entities/shipping-addres.entity";

@Injectable()
export class CustomerProvider implements ICustomerProvider {
    constructor(
        @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
        @InjectRepository(BillingAddressEntity) private billingAddressRepository: Repository<BillingAddressEntity>,
        @InjectRepository(ShippingAddressEntity) private shippingAddressRepository: Repository<ShippingAddressEntity>
    )
        { }
    findByEmail(email: string): Promise<CustomerEntity> {
        return this.customerRepository.findOne({ where: { email: email }, relations: ['billingAddress', 'shippingAddress'] });
    }
    async create(customerDto: CustomerDataDto): Promise<CustomerEntity> {
        const billingAddress = this.billingAddressRepository.create({
            addressLine1: customerDto.billing_address.address_line_1,
            addressLine2: customerDto.billing_address.address_line_2,
            country: customerDto.billing_address.country,
            region: customerDto.billing_address.region,
            city: customerDto.billing_address.city,
            postalCode: "",
        });

        const shippingAddress = this.shippingAddressRepository.create({
            addressLine1: customerDto.billing_address.address_line_1,
            addressLine2: customerDto.billing_address.address_line_2,
            country: customerDto.billing_address.country,
            region: customerDto.billing_address.region,
            city: customerDto.billing_address.city,
            postalCode: "",
        });

        const customer = this.customerRepository.create({
            fullName: customerDto.full_name,
            phoneNumber: customerDto.phone_number,
            email: customerDto.email,
            legalIdType: customerDto.legal_id_type,
            legalIdNumber: customerDto.legal_id,
            billingAddress,
            shippingAddress,
            isActive: true,
            createdBy: "SYSTEM",
            updatedBy: "SYSTEM"
        });

         const savedbillingAddress = await this.billingAddressRepository.save(billingAddress);
        const savedshippingAddress = await this.shippingAddressRepository.save(shippingAddress);
        customer.billingAddress = savedbillingAddress;
        customer.shippingAddress = savedshippingAddress;
        return await this.customerRepository.save(customer);
    }

    async findAll(): Promise<CustomerEntity[]> {
        return await this.customerRepository.find({ relations: ['billingAddress', 'shippingAddress'] });
    }

    async finById(id: string): Promise<CustomerEntity> {
        return await this.customerRepository.findOne({ where: { id }, relations: ['billingAddress', 'shippingAddress'] });
    }

    async update(id: string, customer: CustomerDataDto): Promise<CustomerEntity> {
        throw new Error("Method not implemented.");

    }
}