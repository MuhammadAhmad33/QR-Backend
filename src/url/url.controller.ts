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
        return this.urlService.getUrlByTinyUrl(id);
    }

    @Post()
    async createUrl(
        @Body() data: { fullUrl: string; tinyUrl: string, tiny: string },
        @GetUser() user: any,
    ) {
        if (!data.fullUrl.startsWith('https://') && !data.fullUrl.startsWith('http://')) {
            data.fullUrl = `https://${data.fullUrl}`;
        }
        const tiny = this.urlService.generateTinyUrl();
        data.tinyUrl = `https://qr-sass-frontend.vercel.app/label/${tiny}`;
        data.tiny = tiny;
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
