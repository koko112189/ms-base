import { Injectable } from "@nestjs/common";
import { ICustomerService } from "../customer.service";
import { CustomerEntity } from "src/data-provider/entities/customer.entity";
import { ICustomerUc } from "src/core/use-case/customer.uc";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { EmessageMapping } from "src/common/utils/enums/message.enum";
import { CustomerDataDto } from "src/controller/dto/customer/customer.dto";

@Injectable()
export class ItemService implements ICustomerService {

    constructor(private readonly customerUc: ICustomerUc) { }
    create(customer: CustomerDataDto): Promise<ResponseService<any>> {
        return this.customerUc.create(customer);
    }

    async findAll(): Promise<CustomerEntity[]> {
        return await this.customerUc.findAll();
    }
    async findById(id: string): Promise<CustomerEntity> {
        return await this.customerUc.finById(id);
    }
    async update(id: string, item: CustomerDataDto): Promise<ResponseService<any>> {
        return await this.customerUc.update(id, item);
    }

}