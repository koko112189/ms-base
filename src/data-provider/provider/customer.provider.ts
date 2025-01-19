import { Injectable } from "@nestjs/common";
import { CustomerEntity } from "../entities/customer.entity";
import { CustomerDataDto } from "src/controller/dto/customer/customer.dto";

@Injectable()
export abstract class ICustomerProvider {
    abstract create(customer: CustomerDataDto): Promise<CustomerEntity>
    abstract findByEmail(email: string): Promise<CustomerEntity>;
    abstract findAll(): Promise<CustomerEntity[]>
    abstract finById(id: string): Promise<CustomerEntity>;
    abstract update(id: string, customer: CustomerDataDto): Promise<CustomerEntity>
}