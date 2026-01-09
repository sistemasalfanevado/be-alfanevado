import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { ZentraTelecreditoOperationService } from './zentra-telecredito-operation.service';
import { CreateZentraTelecreditoOperationDto } from './dto/create-zentra-telecredito-operation.dto';
import { UpdateZentraTelecreditoOperationDto } from './dto/update-zentra-telecredito-operation.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-telecredito-operations')
export class ZentraTelecreditoOperationController {
  constructor(
    private readonly zentraTelecreditoOperationService: ZentraTelecreditoOperationService,
  ) { }

  @Post()
  create(@Body() createDto: CreateZentraTelecreditoOperationDto) {
    return this.zentraTelecreditoOperationService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraTelecreditoOperationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraTelecreditoOperationService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraTelecreditoOperationDto,
  ) {
    return this.zentraTelecreditoOperationService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraTelecreditoOperationService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraTelecreditoOperationService.restore(id);
  }

  @Post('search')
  @Public()
  searchByFilters(
    @Body()
    filters: {
      startDate?: string;
      endDate?: string;
      stateId?: string;
      projectId?: string;
      companyId?: string;
    },
  ) {
    return this.zentraTelecreditoOperationService.findByFilters(filters);
  }

  @Post('create-with-details')
  createWithDetails(
    @Body() createDto: any,
  ) {
    return this.zentraTelecreditoOperationService.createWithDetails(createDto);
  }


}