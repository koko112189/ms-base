import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class BillingAddressDto {
    @IsString()
    @ApiProperty()
    address_line_1: string;
  
    @IsString()
    @ApiProperty()
    address_line_2: string;
  
    @IsString()
    @ApiProperty()
    country: string;
  
    @IsString()
    @ApiProperty()
    region: string;
  
    @IsString()
    @ApiProperty()
    city: string;
  
    @IsString()
    @ApiProperty()
    name: string;
  
    @IsString()
    @ApiProperty()
    phone_number: string;
}