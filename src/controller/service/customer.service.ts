import { Injectable } from "@nestjs/common";
import { CustomerEntity } from "src/data-provider/entities/customer.entity";
import { ResponseService } from "../dto/response-service.dto";
import { CustomerDataDto } from "../dto/customer/customer.dto";

@Injectable()
export abstract class ICustomerService {
    abstract create(customer: CustomerDataDto): Promise<ResponseService<any>>;
    abstract findAll(): Promise<CustomerEntity[]>;
    abstract findById(id: string): Promise<CustomerEntity>;
    abstract findByEmail(email: string): Promise<CustomerEntity>;
    abstract update(id: string, customer: CustomerDataDto): Promise<ResponseService<any>>;
}