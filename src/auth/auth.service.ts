import { 
  HttpException, 
  Injectable, 
  UnauthorizedException, 
  BadRequestException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user.
   * @param userData Partial<User>
   * @returns Promise<{ user: User, accessToken: string }>
   */
  async register(userData: Partial<User>): Promise<{ user: User; accessToken: string }> {
    if (!userData.email || !userData.password) {
      throw new BadRequestException('Email and password are required');
    }

    try {
      // Check if email is already registered
      const existingUser = await this.userModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new BadRequestException('Email is already registered');
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new this.userModel({
        ...userData,
        password: hashedPassword,
      });
      await user.save();

      // Generate JWT token
      const payload = { email: user.email, sub: user._id };
      const token = this.jwtService.sign(payload);

      return { user, accessToken: token };
    } catch (error) {
      // Log error for debugging
      console.error('Error registering user:', error);

      // Throw appropriate error response
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  /**
   * Log in a user and generate a JWT token.
   * @param email string
   * @param password string
   * @returns Promise<{ accessToken: string }>
   */
  async login(email: string, password: string): Promise<{ accessToken: string }> {
    try {
      // Find user by email
      const user = await this.userModel.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid email or password');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('User is not active');
      }

      // Generate JWT token
      const payload = { email: user.email, sub: user._id };
      const token = this.jwtService.sign(payload);
      return { accessToken: token };
    } catch (error) {
      // Log error for debugging
      console.error('Error during login:', error);

      // Throw appropriate error response
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to log in');
    }
  }
}
