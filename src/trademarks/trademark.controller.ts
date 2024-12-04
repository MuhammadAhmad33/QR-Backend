import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
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
    @GetUser() user: any, // Extract user details from token
  ) {
    // console.log(user)
    const owner = user.userId; 
    return this.trademarkService.createTrademark({ ...body, owner });
  }

  @Get()
  async getTrademarks(@GetUser() user: any) {
    const companyId = user.userId; // Use userId directly as companyId
    return this.trademarkService.getTrademarksByCompany(companyId);
  }
}
