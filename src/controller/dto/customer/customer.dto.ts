import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { BillingAddressDto } from "./billing-address.dto";
import { ShippingAddressDto } from "./shipping-address.dto";
import { ApiProperty } from "@nestjs/swagger";


export class CustomerDataDto {
    @IsString()
    @ApiProperty()
    phone_number: string;

    @IsString()
    @ApiProperty()
    email: string;
  
    @IsString()
    @ApiProperty()
    full_name: string;
  
    @IsString()
    @ApiProperty()
    legal_id: string;
  
    @IsString()
    @ApiProperty()
    legal_id_type: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => BillingAddressDto)
    billing_address: BillingAddressDto

    @ApiProperty()
    @ValidateNested()
    @Type(() => ShippingAddressDto)
    shipping_address: ShippingAddressDto
  }

  




