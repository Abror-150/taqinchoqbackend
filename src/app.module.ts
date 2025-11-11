import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UploadController } from './upload/upload.controller';
import { OrderModule } from './order/order.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [ProductModule, PrismaModule, OrderModule, ContactModule],
  controllers: [AppController, UploadController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
