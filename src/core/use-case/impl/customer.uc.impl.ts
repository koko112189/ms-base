import { Injectable } from "@nestjs/common";
import { ICustomerUc } from "../customer.uc";
import { CustomerEntity } from "src/data-provider/entities/customer.entity";
import { ICustomerProvider } from "src/data-provider/provider/customer.provider";
import GeneralUtils from "src/common/utils/general-utils";
import { Etask, EtaskDesc } from "src/common/utils/enums/task.enum";
import { response } from "express";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { EmessageMapping } from "src/common/utils/enums/message.enum";
import { CustomerDataDto } from "src/controller/dto/customer/customer.dto";

@Injectable()
export class CustomerUcImpl implements ICustomerUc{

    constructor(public readonly itemProvider: ICustomerProvider) { }
    findByEmail(email: string): Promise<CustomerEntity> {
        try {
            return this.itemProvider.findByEmail(email);
        } catch (error) {
            throw error;
        }
    }
    async create(customer: CustomerDataDto): Promise<ResponseService> {
        try {
            const createdCustomer = await this.itemProvider.create(customer);
            return new ResponseService(true, EmessageMapping.DEFAULT, 200, createdCustomer);
        } catch (error) {
            GeneralUtils.assignTaskError(error, Etask.CREATE, EtaskDesc.CREATE);
            throw error;
        }
    }
    async findAll(): Promise<CustomerEntity[]> {
        try {
            return await this.itemProvider.findAll();
        } catch (error) {
            throw error;
        }
    }
    async finById(id: string): Promise<CustomerEntity> {
        try {
            return await this.itemProvider.finById(id);
        } catch (error) {
            throw error;
        }
    }
    async update(id: string, customer: CustomerDataDto): Promise<ResponseService> {
        throw new Error("Method not implemented.");
    }
}