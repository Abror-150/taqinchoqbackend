import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Tillaqosh',
    description: 'Mahsulotning o‘zbekcha nomi',
  })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({
    example: 'Тиллакoш',
    description: 'Mahsulotning ruscha nomi (ixtiyoriy)',
    required: false,
  })
  @IsOptional()
  @IsString()
  name_ru?: string;

  @ApiProperty({
    example: 'Golden Necklace',
    description: 'Mahsulotning inglizcha nomi (ixtiyoriy)',
    required: false,
  })
  @IsOptional()
  @IsString()
  name_en?: string;

  @ApiProperty({
    example: 'Milliy uslubdagi qo‘l mehnatida yasalgan taqinchoq',
    description: 'O‘zbekcha izoh',
  })
  @IsString()
  @IsNotEmpty()
  describtion_uz: string;

  @ApiProperty({
    example: 'Национальное украшение ручной работы',
    description: 'Ruscha izoh (ixtiyoriy)',
    required: false,
  })
  @IsOptional()
  @IsString()
  describtion_ru?: string;

  @ApiProperty({
    example: 'Handcrafted national jewelry piece',
    description: 'Inglizcha izoh (ixtiyoriy)',
    required: false,
  })
  @IsOptional()
  @IsString()
  describtion_en?: string;

  @ApiProperty({
    example: 120000,
    description: 'Mahsulot narxi (so‘m)',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 'uploads/product1.jpg',
    description: 'Rasm file yo‘li yoki URL manzili',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    example: true,
    description: 'Mahsulotda qo‘llanma (manual) bormi',
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  has_manual?: boolean = true;
}
