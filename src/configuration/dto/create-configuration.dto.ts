import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Contact {
  @ApiProperty()
  fanPage: string;
  @ApiProperty()
  zalo: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  bankAccount: string;
  @ApiProperty()
  bankName: string;
}

export class UpdateConfigurationDto {
  @ApiProperty()
  homePage: string;

  @ApiProperty()
  aboutPage: string;

  @ApiProperty()
  deliveryPolicyPage: string;

  @ApiProperty()
  paymentGuidePage: string;

  @ApiProperty({ type: Contact })
  contact: Contact;
}
