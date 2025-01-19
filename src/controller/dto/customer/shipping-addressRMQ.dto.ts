import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class ShippingAddressDtoRMQ {
    @IsString()
    @IsOptional()
    @ApiProperty()
    address_line_1: string;
  
    @IsOptional()
    @IsString()
    @ApiProperty()
    @Transform(({ value }) => (value === '' ? undefined : value))
    address_line_2?: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    country: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    region: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    city: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    phone_number: string;
  
    @IsOptional()
    @IsString()
    @ApiProperty()
    @Transform(({ value }) => (value === '' ? undefined : value))
    postal_code?: string;
  }