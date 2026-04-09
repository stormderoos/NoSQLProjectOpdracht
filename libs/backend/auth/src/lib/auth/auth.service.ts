import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUserCredentials, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { CreateUserDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel('User') private userModel: Model<any>,
    private jwtService: JwtService,
  ) {}

  async login(credentials: IUserCredentials): Promise<IUserIdentity> {
    this.logger.log('login ' + credentials.email);

    const user = await this.userModel
      .findOne({ email: credentials.email })
      .select('+password')
      .exec();

    if (user && await bcrypt.compare(credentials.password, user.password)) {
      const payload = {
        user_id: user._id,
        role: user.role,
      };

      return {
        id: user.id,
        name: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        role: user.role,
        token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Email not found or password invalid');
  }

  async register(dto: CreateUserDto): Promise<IUserIdentity> {
    this.logger.log(`Register user ${dto.username}`);

    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) {
      this.logger.debug('User already exists');
      throw new ConflictException('User already exists');
    }

    // Wachtwoord hashen voor opslaan
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });

    const payload = {
      user_id: newUser._id,
      role: newUser.role,
    };

    return {
      id: newUser.id,
      name: newUser.username,
      email: newUser.email,
      profileImgUrl: newUser.profileImgUrl,
      role: newUser.role,
      token: this.jwtService.sign(payload),
    };
  }
}