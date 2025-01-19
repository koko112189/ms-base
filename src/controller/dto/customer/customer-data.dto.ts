import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CustomerDataRMQDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    phone_number: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    full_name: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    legal_id: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    legal_id_type: string;
  }