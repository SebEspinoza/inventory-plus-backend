import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: 3600
                }
            })
        }),
        MongooseModule.forFeature([{ name: 'User', schema: 'UserSchema' }])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
