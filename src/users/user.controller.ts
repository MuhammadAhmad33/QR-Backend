import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Param,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

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

  @UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
  @Post()
  async create(
    @Body() userData: Partial<User>,
    @GetUser() currentUser: any,
  ): Promise<User> {
    try {
      const userId = currentUser.userId; // Extract user ID from token
      console.log('Fetching company for user ID:', userId);
  
      const company = await this.userService.getCompanyByUser(userId); // Fetch the company associated with the user
  
      if (!company) {
        throw new Error('User does not belong to a company');
      }
  
      userData.company = company['_id'].toString(); // Assign the company to the new user
      return await this.userService.createUser(userData);
    } catch (error) {
      console.error('Error in create method:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
  @Get()
  async getUsers(@GetUser() user: any) {
    const userId = user.userId; // Extract user ID from token
    return this.userService.getUsers(userId);
  }

  @UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
  @Get(':id')
  async getUser(@Param('id') userId: string, @GetUser() currentUser: any): Promise<User> {
    try {
      return await this.userService.getUser(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
  @Put(':id') // Update user details by ID
  async updateUser(
    @Param('id') userId: string,
    @Body() updateData: Partial<User>,
    @GetUser() currentUser: any,
  ): Promise<User> {
    try {
      const userIdFromToken = currentUser.userId;
      return await this.userService.updateUser(userIdFromToken, userId, updateData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard) // Protect all routes with JWT authentication
  @Delete(':id') // Delete a user by ID
  async deleteUser(
    @Param('id') userId: string,
    @GetUser() currentUser: any,
  ): Promise<{ message: string }> {
    try {
      const userIdFromToken = currentUser.userId;
      await this.userService.deleteUser(userIdFromToken, userId);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
