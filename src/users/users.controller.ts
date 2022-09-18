import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Headers } from '@nestjs/common';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
  })
  create(@Body() dto: CreateUserDto): Promise<User | void> {
    return this.usersService.create(dto);
  }

  //verifyUserEmail

  @Get('verify/:id')
  @ApiOperation({
    summary: 'Verify user email',
  })
  verifyUserEmail(@Param('id') id: string): Promise<string> {
    return this.usersService.verifyUserEmail(id);
  }

  @Get('change/:email')
  @ApiOperation({
    summary: 'Send email to change password',
  })
  forgotPasswordEmail(@Param('email') email: string): Promise<string> {
    return this.usersService.forgotPasswordEmail(email);
  }

  @Patch('change/password/:id')
  @ApiOperation({
    summary: 'Change user password',
  })
  changePassword(
    @Param('id') id: string,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<{ message: string }> {
    return this.usersService.changePassword(id, dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiBearerAuth()
  findOne(
    @Headers() headers: { authorization: string },
    @Param('id') id: string,
  ): Promise<User | void> {
    return this.usersService.findOne(id, headers);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiBearerAuth()
  update(
    @Headers() headers: { authorization: string },
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User | void> {
    return this.usersService.update(id, dto, headers);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiBearerAuth()
  remove(
    @Headers() headers: { authorization: string },
    @Param('id') id: string,
  ) {
    return this.usersService.remove(id, headers);
  }
}
