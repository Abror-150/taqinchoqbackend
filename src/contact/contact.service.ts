import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateContactDto) {
    const created = await this.prisma.contact.create({ data });
    return created;
  }

  async findAll() {
    const all = await this.prisma.contact.findMany();
    return all;
  }
}
