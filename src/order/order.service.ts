import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    let totalPrice = 0;
    for (const item of createOrderDto.orderItems) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }
      totalPrice += Number(product.price) * (item.quantity || 1);
    }

    const order = await this.prisma.order.create({
      data: {
        fullName: createOrderDto.fullName,
        phoneNumber: createOrderDto.phoneNumber,
        location: createOrderDto.location,
        oferta: createOrderDto.oferta ?? false,
        totalPrice,
        orderItems: {
          create: createOrderDto.orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity || 1,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return order;
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: { include: { product: true } },
      },
    });

    const ordersWithTotal: any = orders.map((order) => {
      const total: any = order.orderItems.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0,
      );
      return { ...order, totalPrice: total };
    });
    const totalCount = await this.prisma.order.count();

    return {
      totalCount,
      orders: ordersWithTotal,
    };
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: { include: { product: true } } },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    let totalPrice;
    if (updateOrderDto.orderItems) {
      totalPrice = 0;
      for (const item of updateOrderDto.orderItems) {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product)
          throw new Error(`Product with id ${item.productId} not found`);
        totalPrice += Number(product.price) * (item.quantity || 1);
      }
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
        totalPrice: totalPrice ?? undefined,
        orderItems: updateOrderDto.orderItems
          ? {
              deleteMany: {},
              create: updateOrderDto.orderItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity || 1,
              })),
            }
          : undefined,
      },
      include: { orderItems: { include: { product: true } } },
    });

    return updatedOrder;
  }

  async remove(id: string) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
