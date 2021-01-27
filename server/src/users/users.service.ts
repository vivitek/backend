import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserCreationInput, UserUpdateInput } from './schemas/users.input';

@Injectable()
export class UsersService {
  @InjectModel(User.name) private userModel: Model<User>;

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }
  async getAll(): Promise<User[]> {
    return this.userModel.find();
  }
  async createUser(data: UserCreationInput): Promise<User> {
    const user = new this.userModel({
      ...data,
      password: bcrypt.hashSync(data.password, 12),
    });
    return user.save();
  }
  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
  async updateUser(data: UserUpdateInput): Promise<User> {
    return await this.userModel.findByIdAndUpdate(data._id, data).exec();
  }
}
