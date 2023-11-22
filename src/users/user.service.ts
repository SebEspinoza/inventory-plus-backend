import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { encodePassword } from "src/utils/bcrypt";
import { Role, RoleDocument } from "src/schemas/role.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>) { }

    async create(user: User): Promise<User> {
        const password = await encodePassword(user.password);
        const createdUser = new this.userModel({ ...user, password });
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    async update(id: string, user: User): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async remove(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email });
    }

    async setCurrentRefreshToken(refreshToken: string, userId: string) {
        const currentHashedRefreshToken = await encodePassword(refreshToken);
        return this.userModel.updateOne({ _id: userId }, { currentHashedRefreshToken });
    }
}