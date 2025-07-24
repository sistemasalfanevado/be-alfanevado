import { Module } from '@nestjs/common';
import { ZentraUsersService } from './zentra-users.service';
import { ZentraUsersController } from './zentra-users.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ZentraUsersController],
  providers: [ZentraUsersService],
  exports: [ZentraUsersService],
})
export class ZentraUsersModule {}