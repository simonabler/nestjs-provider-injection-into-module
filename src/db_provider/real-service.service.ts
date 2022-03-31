import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { User } from './schemas/user.model';
import { MyInjectableOptionsFactory } from '../../libs/my-lib/src/interfaces/async-options.interface';
import { MyInjectableService } from '../../libs/my-lib/src/interfaces/my-injectable-service.interface';

@Injectable()
export class RealService
  implements MyInjectableService, MyInjectableOptionsFactory
{
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  createMyInjectableOptions():
    | MyInjectableService
    | Promise<MyInjectableService> {
    return this;
  }

  createEntry(user: User) {
    console.log('createEntry');
    return user;
  }

  async findAll(): Promise<User[]> {
    console.log('findAll');
    const user = await this.userModel.find().select('-password').exec();
    if (user)
      return user.map((a) => {
        const retUser = new User();
        retUser.id = a._id;
        retUser.salt = a.email;
        retUser.username = a.username;
        retUser.permissions = a.permissions;
        return retUser;
      });
    return undefined;
  }
}
