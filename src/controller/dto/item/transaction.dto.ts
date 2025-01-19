// src/application/dtos/create-transaction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class TransactionDto {
    @IsString()
    @ApiProperty()
    customerId: string;

    @IsString()
    @ApiProperty()
    productId: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    amount: number;
}