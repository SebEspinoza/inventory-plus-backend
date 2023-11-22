import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';
require('dotenv').config();


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '1d',
                }
            })
        }),
        MongooseModule.forFeature([{ name: 'User', schema: 'UserSchema' }]), MongooseModule.forFeature([{ name: 'Role', schema: 'RoleSchema' }])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
