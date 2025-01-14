import { ApiProperty } from "@nestjs/swagger";
import { isBoolean, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { InventoryDto } from "../inventory/inventory.dto";
import { Type } from "class-transformer";

export class ItemUpdateDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    currentStock: number;
}
