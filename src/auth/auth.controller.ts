import { Body, Controller, Post, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response, response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ success: Boolean }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response): Promise<{ token: string }> {
        response.cookie('jwt', this.authService.login(loginDto), {
            httpOnly: true,
        })
        return this.authService.login(loginDto);
    }
}
