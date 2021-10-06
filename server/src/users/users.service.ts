import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserCreationInput, UserUpdateInput } from './schemas/users.input';

@Injectable()
export class UsersService {
  @InjectModel(User.name) private userModel: Model<User>;

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(query: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(query).exec()
  }
  async createUser(data: UserCreationInput): Promise<User> {
    const user = new this.userModel({
      ...data,
      password: bcrypt.hashSync(data.password, 12),
    });
    return user.save();
  }
  async deleteById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
  async updateById(data: UserUpdateInput): Promise<User> {
    const newData = { ...data };
    if (newData.password) {
      newData.password = bcrypt.hashSync(data.password, 12);
    }
    return await this.userModel.findByIdAndUpdate(data._id, newData, {
      new: true,
    });
  }

  async setSecret(secret: string, userId: string): Promise<User> {
    const user = await this.findById(userId);
    user.otp_enabled = true;
    user.otp_secret = secret;
    return await user.save();
  }
}
