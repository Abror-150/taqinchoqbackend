import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  message: string;
}
