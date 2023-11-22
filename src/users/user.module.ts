import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User, UserSchema } from "../schemas/user.schema";
import { Role, RoleSchema } from "src/schemas/role.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }