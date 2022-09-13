import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Message } from './entities/message.entity';

@Injectable()
export class UsersService {
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
    const all = this.prisma.message.findMany();

    const random = Math.floor(Math.random() * (await all).length);

    return all[random];
  }

  findAll(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }
}
