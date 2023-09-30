import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            usernameField: 'email'
        });
    }

    async validate(payload: User) {
        const user = await this.authService.validateUser(payload.username, payload.password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
