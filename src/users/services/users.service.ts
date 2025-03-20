import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async create(body: CreateUserDto): Promise<User> {
    const email = await this.usersModel.findOne({ email: body?.email });
    if (email) {
      throw new HttpException('User Already Exist', HttpStatus.CONFLICT);
    }

    const phone = await this.usersModel.findOne({ phone: body?.phone });
    if (phone) {
      throw new HttpException(
        'Phone Number Already Exist',
        HttpStatus.CONFLICT,
      );
    }

    const cnic = await this.usersModel.findOne({ cnic: body?.cnic });
    if (cnic) {
      throw new HttpException('Cnic Already Exist', HttpStatus.CONFLICT);
    }
    return await this.usersModel.create(body);
  }
}
