import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser, IUserInfo } from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  private mapUser(user: any): IUser {
    const { _id, __v, ...rest } = user;
    return { id: _id.toString(), ...rest } as IUser;
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userModel.find().lean().exec();
    return users.map(user => this.mapUser(user));
  }

  async findOne(_id: string): Promise<IUser | null> {
    this.logger.log(`Finding user with id ${_id}`);
    const item = await this.userModel.findOne({ _id }).lean().exec();
    if (!item) {
      this.logger.debug('User not found');
      return null;
    }
    return this.mapUser(item);
  }

  async findOneByEmail(email: string): Promise<IUserInfo | null> {
    const item = await this.userModel
      .findOne({ email })
      .select('-password')
      .lean()
      .exec();
    return item ? this.mapUser(item) : null;
  }

  async create(user: CreateUserDto): Promise<IUserInfo> {
    const createdItem = await this.userModel.create(user);
    const userObject = createdItem.toObject();
    return this.mapUser(userObject);
  }

  async deleteUser(_id: string): Promise<void> {
    this.logger.log(`Deleting user with id ${_id}`);
    await this.userModel.findByIdAndDelete(_id).exec();
  }

  async updateUser(_id: string, updateUserDto: UpdateUserDto): Promise<IUserInfo | null> {
    const currentUser = await this.userModel.findById(_id);
    if (!currentUser) {
      return null;
    }
  
    if (updateUserDto.password) currentUser.password = updateUserDto.password;
    if (updateUserDto.username) currentUser.username = updateUserDto.username;
    if (updateUserDto.email) currentUser.email = updateUserDto.email;
    if (updateUserDto.profileImgUrl) currentUser.profileImgUrl = updateUserDto.profileImgUrl;
    if (updateUserDto.role) currentUser.role = updateUserDto.role;
    if (updateUserDto.gender !== undefined) currentUser.gender = updateUserDto.gender;
  
    await currentUser.save();
    return this.mapUser(currentUser.toObject());
  }
}