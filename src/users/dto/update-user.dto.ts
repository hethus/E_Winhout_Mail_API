import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  updatedAt?: Date;
}

export class UpdateUserPasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
    {
      message: 'password too weak',
    },
  )
  @ApiProperty({
    description:
      'User password (min 8 chars, max 20 chars, at least one number, one uppercase letter, one lowercase letter and one special character)',
    example: '@Password123',
  })
  password: string;

  updatedAt?: Date;
}
