
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class IMessageDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Message ID"})
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Message ID"})
    readonly idMesage: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "This is a description the message"})
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "This is mesagge"})
    readonly message: string;

}