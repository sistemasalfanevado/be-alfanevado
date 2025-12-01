import {
  Controller, Get, Post, Body, Param, Patch, Put, Delete
} from '@nestjs/common';
import { ZentraAccountabilityService } from './zentra-accountability.service';
import { CreateZentraAccountabilityDto } from './dto/create-zentra-accountability.dto';
import { UpdateZentraAccountabilityDto } from './dto/update-zentra-accountability.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-accountabilities')
// @UseGuards(JwtAuthGuard)
export class ZentraAccountabilityController {
  constructor(
    private readonly zentraAccountabilityService: ZentraAccountabilityService
  ) { }

  @Post()
  async create(
    @Body() createZentraAccountabilityDto: CreateZentraAccountabilityDto
  ) {
    await this.zentraAccountabilityService.create(createZentraAccountabilityDto);
    return { message: 'Accountability creada exitosamente' };
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraAccountabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraAccountabilityService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateZentraAccountabilityDto: UpdateZentraAccountabilityDto
  ) {
    await this.zentraAccountabilityService.update(id, updateZentraAccountabilityDto);
    return { message: 'Accountability actualizada exitosamente' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraAccountabilityService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraAccountabilityService.restore(id);
  }

  @Post('search')
  @Public()
  search(@Body() filters: {
    accountabilityStatusId?: string;
    partyId?: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
    deletedAt?: boolean;
  }) {
    return this.zentraAccountabilityService.findByFilters(filters);
  }

  @Post('add-increment')
  @Public()
  addIncrement(@Body() dataAccountability: any) {
    return this.zentraAccountabilityService.addIncrement(dataAccountability);
  }

  @Post('add-document')
  @Public()
  addDocument(@Body() dataAccountability: any) {
    return this.zentraAccountabilityService.addDocument(dataAccountability);
  }

  @Put('update-document/:id')
  async updateDocument(
    @Param('id') id: string,
    @Body() updateZentraAccountabilityDto: any
  ) {
    await this.zentraAccountabilityService.updateDocument(id, updateZentraAccountabilityDto);
    return { message: 'Accountability actualizada exitosamente' };
  }

  @Delete('remove-document/:id/:accountabilityId')
  removeDocument(
    @Param('id') id: string,
    @Param('accountabilityId') accountabilityId: string,
  ) {
    return this.zentraAccountabilityService.removeDocument(id, accountabilityId);
  }

  
  // Devoluviones
  @Post('add-document-return')
  @Public()
  addDocumentReturn(@Body() dataAccountability: any) {
    return this.zentraAccountabilityService.addDocumentReturn(dataAccountability);
  }


}