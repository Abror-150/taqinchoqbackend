import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @ApiProperty({ description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Quantity of the product', default: 1 })
  @IsInt()
  @IsOptional()
  quantity?: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Full name of the customer' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Phone number of the customer' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'Delivery location/address' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Customer accepts terms',
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  oferta?: boolean;

  @ApiProperty({
    description: 'List of products in the order',
    type: [OrderItemDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
