import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint to create a user and associate with a company
  @Post('create')
  async createUser(@Body() userData: Partial<User>, @Request() req): Promise<User> {
    try {
      return await this.userService.createUser(userData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard) 
  @Get('')
  async getUsers(@Request() req) {
    const user = req.user;
    return this.userService.getUsers(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Body() userData: Partial<User>, @Request() req): Promise<User> {
    const user = req.user;
    const company = await this.userService.getCompanyByUser(user.userId);
    userData.company = company['_id'].toString();
    return this.userService.createUser(userData);
  }
}
