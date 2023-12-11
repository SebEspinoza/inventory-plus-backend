import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ success: boolean, role: Boolean, token: string }> {
        const { username, password, email, first_name, last_name, role } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            username,
            password: hashedPassword,
            email,
            first_name,
            last_name,
            role
        });

        const token = this.jwtService.sign({ id: user._id, username: user.username });

        return { success: true, role: user.role, token: token }
    }

    async login(loginDto: LoginDto): Promise<{ token: string, success: boolean, type: Boolean, data: string }> {
        try {
            const { email, password } = loginDto;
            const user = await this.userModel.findOne({ email });

            if (!user) {
                return { token: null, success: false, type: null, data: null };
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return { token: null, success: false, type: null, data: null };
            }
            const refresh_token = this.jwtService.sign({ id: user._id, username: user.username });
            return { token: refresh_token, success: true, type: user.role, data: user.username };
        } catch (error) {
            return { token: null, success: false, type: null, data: null };
        }
    }
}
