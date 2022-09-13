import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Create a new message',
  })
  @ApiBearerAuth()
  create(@Body() dto: CreateMessageDto): Promise<Message | void> {
    return this.messagesService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get message by id',
  })
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<Message | void> {
    return this.messagesService.findOne(id);
  }

  @Get('random/one')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get a random message',
  })
  @ApiBearerAuth()
  findAleatory(): Promise<Message | void> {
    return this.messagesService.findAleatory();
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get all messages',
  })
  @ApiBearerAuth()
  findAll(): Promise<Message[] | void> {
    return this.messagesService.findAll();
  }
}
