import { Controller } from '@nestjs/common';
import { ICustomerService } from './service/customer.service';
import { CustomerEntity } from 'src/data-provider/entities/customer.entity';
import { CustomerDataDto } from './dto/customer/customer.dto';
import { CustomerDataRMQDto } from './dto/customer/customer-data.dto';
import { ShippingAddressDtoRMQ } from './dto/customer/shipping-addressRMQ.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CustomerListener {
    constructor(private readonly customerService: ICustomerService) {}

    @MessagePattern('verify_customer')
    async verifyCustomer(@Payload() data: {customerData: CustomerDataRMQDto, email: string, shipping_address: ShippingAddressDtoRMQ}): Promise<CustomerEntity> {
        let customer = await this.customerService.findByEmail(data.email);
        if(!customer)
        {
            let new_customer : CustomerDataDto = {
                phone_number: data.customerData.phone_number,
                email: data.email,
                full_name: data.customerData.full_name,
                legal_id: data.customerData.legal_id,
                legal_id_type: data.customerData.legal_id_type,
                billing_address: {
                    address_line_1: "",
                    address_line_2: "",
                    country: "",
                    region: "",
                    city: "",
                    name: "",
                    phone_number: "",
                },
                shipping_address: {
                    address_line_1: data.shipping_address.address_line_1,
                    address_line_2: data.shipping_address.address_line_2,
                    country: data.shipping_address.country,
                    region: data.shipping_address.region,
                    city: data.shipping_address.city,
                    name: data.shipping_address.name,
                    phone_number: data.shipping_address.phone_number,
                }
            }
            customer = (await this.customerService.create(new_customer)).documents;
        }
        return customer; 
    }
}