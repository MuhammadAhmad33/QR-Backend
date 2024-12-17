import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { LabelService } from './label.service';
import { Label } from './label.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

// Define the controller
@Controller('labels')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  // POST endpoint to create a new label
  @Post()
  @UseInterceptors(FileInterceptor('image')) // Handle the image file
  async create(
    @Body() createLabelDto: any, 
    @UploadedFile() image: Express.Multer.File // Explicitly use the type for the uploaded file
  ): Promise<Label> {
    createLabelDto.image = image; // Pass the image to the service
    return this.labelService.create(createLabelDto);
  }

  // GET all labels
  @Get()
  findAll(): Promise<Label[]> {
    return this.labelService.findAll();
  }

  // GET a label by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Label> {
    return this.labelService.findOne(id);
  }

  // PATCH a label by ID
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image')) // Handle the image file
  async update(
    @Param('id') id: string,
    @Body() updateLabelDto: any,
    @UploadedFile() image: Express.Multer.File // Explicitly use the type for the uploaded file
  ): Promise<Label> {
    if (image) {
      updateLabelDto.image = image; // Pass the image to the service
    }
    return this.labelService.update(id, updateLabelDto);
  }

  // DELETE a label by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Label> {
    return this.labelService.remove(id);
  }
}
