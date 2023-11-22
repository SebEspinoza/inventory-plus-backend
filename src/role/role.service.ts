import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from 'src/schemas/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) { }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findOne(role: Boolean): Promise<Role> {
    return this.roleModel.findOne({ role }).exec();
  }
}
