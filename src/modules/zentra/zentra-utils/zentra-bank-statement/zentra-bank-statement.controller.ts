import {
  Controller, Get, Post, Body, Param, Patch, Put, Delete
} from '@nestjs/common';
import { ZentraBankStatementService } from './zentra-bank-statement.service';
import { CreateZentraBankStatementDto } from './dto/create-zentra-bank-statement.dto';
import { UpdateZentraBankStatementDto } from './dto/update-zentra-bank-statement.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-bank-statements')
export class ZentraBankStatementController {
  constructor(private readonly zentraBankStatementService: ZentraBankStatementService) { }

  @Post()
  create(@Body() createZentraBankStatementDto: CreateZentraBankStatementDto) {
    return this.zentraBankStatementService.create(createZentraBankStatementDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraBankStatementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraBankStatementService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateZentraBankStatementDto: UpdateZentraBankStatementDto
  ) {
    return this.zentraBankStatementService.update(id, updateZentraBankStatementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraBankStatementService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraBankStatementService.restore(id);
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.zentraBankStatementService.findAllByProject(projectId);
  }

  
}