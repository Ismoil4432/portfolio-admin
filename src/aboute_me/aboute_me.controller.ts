import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbouteMeService } from './aboute_me.service';
import { CreateAbouteMeDto } from './dto/create-aboute_me.dto';
import { UpdateAbouteMeDto } from './dto/update-aboute_me.dto';

@Controller('aboute-me')
export class AbouteMeController {
  constructor(private readonly abouteMeService: AbouteMeService) {}

  @Post()
  create(@Body() createAbouteMeDto: CreateAbouteMeDto) {
    return this.abouteMeService.create(createAbouteMeDto);
  }

  @Get()
  findAll() {
    return this.abouteMeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abouteMeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbouteMeDto: UpdateAbouteMeDto) {
    return this.abouteMeService.update(+id, updateAbouteMeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abouteMeService.remove(+id);
  }
}
