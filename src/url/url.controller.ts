import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UrlService } from './url.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserService } from 'src/users/user.service';

@Controller('url')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
export class UrlController {
    constructor(
        private urlService: UrlService,
        private userService: UserService
    ) {}

    @Get()
    async getUrls(@GetUser() user: any) {
        const company = await this.userService.getCompanyByUser(user.userId);
        return this.urlService.getUrls(company['_id'].toString());
    }

    @Get(':id')
    async getUrlById(@Param('id') id: string) {
        return this.urlService.getUrlById(id);
    }

    @Post()
    async createUrl(
        @Body() data: { fullUrl: string; tinyUrl: string },
        @GetUser() user: any,
    ) {
        data.tinyUrl = `https://qr-sass-frontend.vercel.app/labels/${this.urlService.generateTinyUrl()}`;
        const owner = await this.userService.getCompanyByUser(user.userId);
        return this.urlService.createUrl({...data, owner: owner['_id'].toString()});
    }

    @Put(':id')
    async updateUrl(
        @Param('id') id: string,
        @Body() data: { fullUrl: string; tinyUrl: string }
    ) {
        return this.urlService.updateUrl(id, data);
    }

    @Delete(':id')
    async deleteUrl(@Param('id') id: string) {
        return this.urlService.deleteUrl(id);
    }
}
