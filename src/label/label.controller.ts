import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { LabelService } from './label.service';
import { Label } from './label.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('labels')
@UseGuards(JwtAuthGuard)
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createLabelDto: any,
    @UploadedFile() image?: Express.Multer.File
  ): Promise<Label> {
    if (!image) {
      throw new BadRequestException('No image file provided');
    }

    return this.labelService.create({
      ...createLabelDto,
      imageBuffer: image.buffer,
      imageOriginalname: image.originalname,
    });
  }

  @Get()
  findAll(): Promise<Label[]> {
    return this.labelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Label> {
    return this.labelService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateLabelDto: any,
    @UploadedFile() image?: Express.Multer.File
  ): Promise<Label> {
    return this.labelService.update(id, updateLabelDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Label> {
    return this.labelService.remove(id);
  }

  @Get('brand/:brandId')
  findByBrand(@Param('brandId') brandId: string): Promise<Label[]> {
    return this.labelService.findByBrand(brandId);
  }
}
