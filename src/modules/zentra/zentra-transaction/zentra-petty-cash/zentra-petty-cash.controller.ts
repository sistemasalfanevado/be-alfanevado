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

import { ZentraPettyCashService } from './zentra-petty-cash.service';
import { CreateZentraPettyCashDto } from './dto/create-zentra-petty-cash.dto';
import { UpdateZentraPettyCashDto } from './dto/update-zentra-petty-cash.dto';

import { Public } from '../../../../auth/shared/decorators/public.decorator';
// import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';

@Controller('zentra-petty-cash')
// @UseGuards(JwtAuthGuard)
export class ZentraPettyCashController {
  constructor(
    private readonly zentraPettyCashService: ZentraPettyCashService,
  ) {}

  // --------------------
  // CRUD
  // --------------------

  @Post()
  create(@Body() dto: CreateZentraPettyCashDto) {
    return this.zentraPettyCashService.create(dto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraPettyCashService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraPettyCashService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateZentraPettyCashDto,
  ) {
    await this.zentraPettyCashService.update(id, dto);
    return { message: 'Petty Cash actualizada exitosamente' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraPettyCashService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraPettyCashService.restore(id);
  }

  // --------------------
  // SEARCH / FILTERS
  // --------------------

  @Post('search')
  @Public()
  search(
    @Body()
    filters: {
      pettyCashStatusId?: string;
      partyId?: string;
      startDate?: string;
      endDate?: string;
      userId?: string;
      deletedAt?: boolean;
    },
  ) {
    return this.zentraPettyCashService.findByFilters(filters);
  }

  // --------------------
  // AMOUNTS
  // --------------------

  @Post('add-increment')
  @Public()
  addIncrement(
    @Body() data: { pettyCashId: string; amount: number },
  ) {
    return this.zentraPettyCashService.addIncrement(data);
  }

  @Post('add-refund')
  @Public()
  addRefund(
    @Body() data: { pettyCashId: string; amount: number },
  ) {
    return this.zentraPettyCashService.addRefund(data);
  }

  // --------------------
  // DOCUMENTS
  // --------------------

  @Post('add-document')
  @Public()
  addDocument(
    @Body() data: { pettyCashId: string; documentId: string },
  ) {
    return this.zentraPettyCashService.addDocument(data);
  }

  @Delete('remove-document/:id')
  removeDocument(@Param('id') id: string) {
    return this.zentraPettyCashService.removeDocument(id);
  }

  // --------------------
  // REPORTS
  // --------------------

  @Post('get-data-report')
  @Public()
  getAllDataReport(@Body('id') pettyCashId: string) {
    return this.zentraPettyCashService.getAllDataReport(pettyCashId);
  }
}