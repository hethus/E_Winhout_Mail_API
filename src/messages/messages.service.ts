import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Message } from './entities/message.entity';
import { rando } from '@nastyox/rando.js';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMessageDto): Promise<Message> {
    return await this.prisma.message
      .create({
        data: dto,
      })
      .catch(handleErrorConstraintUnique);
  }

  findOne(id: string): Promise<Message> {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async findAleatory(): Promise<Message> {
    const all = await this.prisma.message.findMany();
    console.log(all);
    const random = rando(all);
    console.log(random);
    return random;
  }

  findAll(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }
}
