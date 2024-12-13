import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.schema';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // Endpoint to create a new company
  @Post('create')
  async createCompany(@Body() companyData: Partial<Company>): Promise<Company> {
    try {
      return await this.companyService.createCompany(companyData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Endpoint to add a user to a company
  @Post(':companyId/add-user')
  async addUserToCompany(
    @Param('companyId') companyId: string,
    @Body('userId') userId: string,
  ): Promise<Company> {
    try {
      return await this.companyService.addUserToCompany(companyId, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Endpoint to add a brand to a company
  @Post(':companyId/add-brand')
  async addBrandToCompany(
    @Param('companyId') companyId: string,
    @Body('brandId') brandId: string,
  ): Promise<Company> {
    try {
      return await this.companyService.addBrandToCompany(companyId, brandId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Endpoint to get all users of a company
@Get(':companyId/users')
async getUsersOfCompany(@Param('companyId') companyId: string): Promise<any[]> {
  try {
    return await this.companyService.getUsersOfCompany(companyId);
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}

  // Endpoint to get company details by email
  @Get('find-by-email')
  async findCompanyByEmail(@Body('email') email: string): Promise<Company | null> {
    try {
      return await this.companyService.findCompanyByEmail(email);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
