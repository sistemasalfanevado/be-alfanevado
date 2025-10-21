import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards 
} from '@nestjs/common';
import { ZentraTelecreditoOperationStateService } from './zentra-telecredito-operation-state.service';
import { CreateZentraTelecreditoOperationStateDto } from './dto/create-zentra-telecredito-operation-state.dto';
import { UpdateZentraTelecreditoOperationStateDto } from './dto/update-zentra-telecredito-operation-state.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-telecredito-operation-states')
// @UseGuards(JwtAuthGuard) // Descomenta si deseas proteger todas las rutas
export class ZentraTelecreditoOperationStateController {
  constructor(
    private readonly zentraTelecreditoOperationStateService: ZentraTelecreditoOperationStateService,
  ) {}

  @Post()
  create(
    @Body() createDto: CreateZentraTelecreditoOperationStateDto,
  ) {
    return this.zentraTelecreditoOperationStateService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraTelecreditoOperationStateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraTelecreditoOperationStateService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraTelecreditoOperationStateDto,
  ) {
    return this.zentraTelecreditoOperationStateService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraTelecreditoOperationStateService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraTelecreditoOperationStateService.restore(id);
  }
}