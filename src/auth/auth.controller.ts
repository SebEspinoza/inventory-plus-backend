import { Controller, Body, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    // async login(@Body() loginDto: LoginDto) {
    //     const token = await this.authService.validateUser(loginDto.email, loginDto.password);

    // }
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.validateUser(req.body.email, req.body.password);
        res.cookie('jwt', token.token, { httpOnly: true });
        return token;
    }
}
