import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { handleTokenIsValid } from 'src/utils/handle-token-is-valid.util';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 8);

    const data = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    };

    return await this.prisma.user
      .create({ data })
      .catch(handleErrorConstraintUnique);
  }

  findOne(id: string, headers: { authorization: string }): Promise<User> {
    return this.verifyIdAndReturnUser(id, headers);
  }

  async update(
    id: string,
    dto: UpdateUserDto,
    headers: { authorization: string },
  ): Promise<User> {
    await this.verifyIdAndReturnUser(id, headers);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 8);
    }

    dto.updatedAt = new Date();

    if (dto.email) {
      throw new NotAcceptableException('Email cannot be updated');
    }

    return this.prisma.user
      .update({
        where: { id },
        data: {
          ...dto,
        },
      })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string, headers: { authorization: string }) {
    await this.verifyIdAndReturnUser(id, headers);
    return await this.prisma.user.delete({ where: { id } });
  }

  async verifyIdAndReturnUser(
    id: string,
    headers: { authorization: string },
  ): Promise<User> {
    const user: User = await this.prisma.user
      .findUnique({
        where: { id },
      })
      .catch((err) => {
        if (err.code === 'P2023') {
          throw new NotAcceptableException(`'${id}' is not a valid ID`);
        }
        throw new NotFoundException(`User id '${id}' not found`);
      });

    if (!user) {
      throw new NotFoundException(`User id '${id}' not found`);
    }

    handleTokenIsValid(headers, user.email);

    return user;
  }
}
