import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { ZentraUsersService } from './zentra-users.service';
import { ZentraCreateUserDto } from './dto/zentra-create-user.dto';
import { ZentraUpdateUserDto } from './dto/zentra-update-user.dto';

@Controller('zentra-users')
export class ZentraUsersController {
  constructor(private zentraUsersService: ZentraUsersService) { }

  @Post()
  async create(@Body() zentraCreateUserDto: ZentraCreateUserDto) {
    const user = await this.zentraUsersService.create(zentraCreateUserDto);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Get()
  async findAll() {
    const users = await this.zentraUsersService.findAll();
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.zentraUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() zentraUpdateUserDto: ZentraUpdateUserDto) {
    const user = await this.zentraUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const updatedUser = await this.zentraUsersService.update(id, zentraUpdateUserDto);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.zentraUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const deletedUser = await this.zentraUsersService.remove(id);
    const { password, ...userWithoutPassword } = deletedUser;
    return userWithoutPassword;
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const user = await this.zentraUsersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const restoredUser = await this.zentraUsersService.restore(id);
    const { password, ...userWithoutPassword } = restoredUser;
    return userWithoutPassword;
  }
}