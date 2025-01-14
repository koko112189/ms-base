import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, isNumber, IsString } from "class-validator";

export class InventoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    currentStock: number;
}