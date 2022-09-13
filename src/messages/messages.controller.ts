import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Message } from './entities/message.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new message',
  })
  create(@Body() dto: CreateMessageDto): Promise<Message | void> {
    return this.usersService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get message by id',
  })
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<Message | void> {
    return this.usersService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get a random message',
  })
  @ApiBearerAuth()
  findAleatory(): Promise<Message | void> {
    return this.usersService.findAleatory();
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get all messages',
  })
  @ApiBearerAuth()
  findAll(): Promise<Message[] | void> {
    return this.usersService.findAll();
  }
}
