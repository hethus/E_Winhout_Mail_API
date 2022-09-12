import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @ApiProperty({
    description: 'Message text',
    example: 'hello!',
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    description: 'nickname of the message',
    example: 'Alvin',
  })
  email: string;
}
