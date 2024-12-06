// trademark.controller.ts
import { Controller, Post, Get, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TrademarkService } from './trademark.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('trademarks')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
export class TrademarkController {
  constructor(private trademarkService: TrademarkService) {}

  @Post('create')
  async createTrademark(
    @Body() body: { name: string; code: string },
    @GetUser() user: any,
  ) {
    const owner = user.userId; 
    return this.trademarkService.createTrademark({ ...body, owner });
  }

  @Get()
  async getTrademarks(@GetUser() user: any) {
    const companyId = user.userId; // Use userId directly as companyId
    return this.trademarkService.getTrademarksByCompany(companyId);
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