import {IsEmail, IsEnum, IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from "class-transformer";

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
  bankAccountName: string;
  @ApiProperty()
  bankName: string;
}

export class UpdateConfigurationDto {
  @IsOptional()
  @ApiProperty()
  homePage: string;

  @IsOptional()
  @ApiProperty()
  aboutPage: string;

  @IsOptional()
  @ApiProperty()
  deliveryPolicyPage: string;

  @IsOptional()
  @ApiProperty()
  paymentGuidePage: string;

  @IsOptional()
  @ApiProperty()
  bannerUrl: string;

  @IsOptional()
  @ApiProperty()
  backgroundUrl: string;

  @ApiProperty({type: Contact})
  @Type(() => Contact)
  contact: Contact;
}
