import { 
  Controller, Get, Post, Body, Param, Patch, Put, Delete 
} from '@nestjs/common';
import { ZentraSubProjectService } from './zentra-sub-project.service';
import { CreateZentraSubProjectDto } from './dto/create-zentra-sub-project.dto';
import { UpdateZentraSubProjectDto } from './dto/update-zentra-sub-project.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';
// import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';

@Controller('zentra-sub-projects')
// @UseGuards(JwtAuthGuard)
export class ZentraSubProjectController {
  constructor(private readonly zentraSubProjectService: ZentraSubProjectService) {}

  @Post()
  create(@Body() createZentraSubProjectDto: CreateZentraSubProjectDto) {
    return this.zentraSubProjectService.create(createZentraSubProjectDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraSubProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraSubProjectService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateZentraSubProjectDto: UpdateZentraSubProjectDto
  ) {
    return this.zentraSubProjectService.update(id, updateZentraSubProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraSubProjectService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraSubProjectService.restore(id);
  }
}