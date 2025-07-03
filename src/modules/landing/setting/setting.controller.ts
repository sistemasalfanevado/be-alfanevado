import { Controller, Get, Patch, Delete, Body, Param, Query, Post, Put, UseGuards } from '@nestjs/common';
import { SettingsService } from './setting.service';
import { SettingDto } from './dto/setting.dto';
import { JwtAuthGuard } from '../../../auth/shared/guards/jwt-auth.guard'
import { Public } from '../../../auth/shared/decorators/public.decorator';

@Controller('setting')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) { }

  @Post()
  create(@Body() settingDto: SettingDto) {
    return this.settingsService.create(settingDto);
  }

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }
  
  @Get('maintenance')
  @Public()
  async getMaintenanceMode(@Query('site') site: string) {
    const maintenanceMode = await this.settingsService.getMaintenanceMode(site);
    return { maintenanceMode };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() settingDto: SettingDto) {
    return this.settingsService.update(id, settingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingsService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.settingsService.restore(id);
  }

}