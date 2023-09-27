import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
import * as bcrypt from "bcrypt";
import { User } from "src/schemas/user.schema"

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        const checkpassword = await bcrypt.compare(password, user.password);
        if (user && checkpassword) {
            const { password, ...result } = user;
            const payload = { email: user.email };
            return {
                success: true,
                type: user.role,
                data: this.jwtService.sign(payload),
            }
        }
        return {
            success: false,
            data: "Invalid email or password",
        };
    }

    async login(user: User) {
        const payload = { email: user.email };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}