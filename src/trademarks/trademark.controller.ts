// trademark.controller.ts
import { Controller, Post, Get, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TrademarkService } from './trademark.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { UserService } from 'src/users/user.service';

@Controller('trademarks')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
export class TrademarkController {
  constructor(private trademarkService: TrademarkService, private userService: UserService) {}

  @Post('create')
  async createTrademark(
    @Body() body: { name: string; code: string },
    @GetUser() user: any,
  ) {
    const owner = await this.userService.getCompanyByUser(user.userId);
    return this.trademarkService.createTrademark({ ...body, owner: owner['_id'].toString() });
  }

  @Get()
  async getTrademarks(@GetUser() user: any) {
    const company = await this.userService.getCompanyByUser(user.userId);
    return this.trademarkService.getTrademarksByCompany(company['_id'].toString());
  }

  @Get(':id')
  async getTrademarkById(@Param('id') id: string) {
    return this.trademarkService.getTrademarkById(id);
  }

  @Put(':id')
  async updateTrademark(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; code: string }>,
  ) {
    return this.trademarkService.updateTrademark(id, body);
  }

  @Delete(':id')
  async deleteTrademark(@Param('id') id: string) {
    return this.trademarkService.deleteTrademark(id);
  }
}