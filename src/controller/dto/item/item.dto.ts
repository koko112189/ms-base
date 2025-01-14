import { ApiProperty } from "@nestjs/swagger";
import { isBoolean, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { InventoryDto } from "../inventory/inventory.dto";
import { Type } from "class-transformer";

export class ItemDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    sku: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string;

    @IsString()
    @ApiProperty()
    description?: string;

    @IsNotEmpty()
    @ApiProperty()
    categoryId: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    @Min(0)
    basePrice: number;

    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    @Min(0)
    costPrice: number;

    @IsNumber()
    @ApiProperty()
    @Min(0)
    discountPrice?: number;

    @ApiProperty()
    isActive?: boolean

    @ApiProperty({
        type: () => [InventoryDto],
        isArray: true
    }
    )
    @Type(() => InventoryDto)
    inventory: InventoryDto[]
}
