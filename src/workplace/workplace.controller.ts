import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkplaceService } from './workplace.service';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { UpdateWorkplaceDto } from './dto/update-workplace.dto';

@Controller('workplace')
export class WorkplaceController {
  constructor(private readonly workplaceService: WorkplaceService) {}

  @Post()
  create(@Body() createWorkplaceDto: CreateWorkplaceDto) {
    return this.workplaceService.create(createWorkplaceDto);
  }

  @Get()
  findAll() {
    return this.workplaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workplaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkplaceDto: UpdateWorkplaceDto) {
    return this.workplaceService.update(+id, updateWorkplaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workplaceService.remove(+id);
  }
}
