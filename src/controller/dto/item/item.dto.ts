import { ApiProperty } from "@nestjs/swagger";
import { isBoolean, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";


export class exampleDto {
    @IsString()
    @ApiProperty()
    description?: string;

}
