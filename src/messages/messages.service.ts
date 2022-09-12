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
      .create({ dto })
      .catch(handleErrorConstraintUnique);
  }

  findOne(id: string): Promise<Message> {
    return this.prisma.message.findUnique({ where: { id } });
  }

  findAll(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }
}
