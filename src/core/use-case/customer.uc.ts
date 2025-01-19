import { Injectable } from "@nestjs/common";
import { CustomerDataDto } from "src/controller/dto/customer/customer.dto";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { CustomerEntity } from "src/data-provider/entities/customer.entity";

@Injectable()
export abstract class ICustomerUc {
    abstract create(customer: CustomerDataDto): Promise<ResponseService>;
    abstract findByEmail(email: string): Promise<CustomerEntity>;
    abstract findAll(): Promise<CustomerEntity[]>;
    abstract finById(id: string): Promise<CustomerEntity>;
    abstract update(id: string, customer: CustomerDataDto): Promise<ResponseService>;
}