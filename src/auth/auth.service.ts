import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/schemas/role.schema';




@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        @InjectModel(Role.name)
        private roleModel: Model<Role>
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ success: boolean, role: any, token: string }> {
        const { username, password, email, first_name, last_name, role } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const roles = await this.roleModel.findOne({ role }).exec();

        console.log(roles);

        const user = await this.userModel.create({
            username,
            password: hashedPassword,
            email,
            first_name,
            last_name,
            role: roles
        });

        const token = this.jwtService.sign({ id: user._id, username: user.username });

        return { success: true, role, token: token }
    }

    async login(loginDto: LoginDto): Promise<{ token: string, success: boolean, type: Role, data: string }> {
        try {
            const { email, password } = loginDto;
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new UnauthorizedException('Correo o Contraseña Incorrecta');
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new UnauthorizedException('Correo o Contraseña Incorrecta');
            }
            const role = await this.roleModel.findById(user.role);
            const refresh_token = this.jwtService.sign({ id: user._id, username: user.username });
            return { token: refresh_token, success: true, type: role, data: user.username };
        } catch {
            throw new UnauthorizedException('Correo o Contraseña Incorrecta');
        }
    }
}  
