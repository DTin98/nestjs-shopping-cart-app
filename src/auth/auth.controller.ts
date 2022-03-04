import { Controller, Post, Body, ValidationPipe, Get, Query, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../shared/decorators/user.decorator';
import { IUser } from '../user/interfaces/user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/sign-up')
    @Public()
    async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<IReadableUser> {
        return this.authService.signUp(createUserDto);
    }

    @Get('/confirm')
    @Public()
    async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto): Promise<boolean> {
        await this.authService.confirm(query.token);
        return true;
    }

    @Post('/sign-in')
    @Public()
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
        return await this.authService.signIn(signInDto);
    }

    @Post('/forgot-password')
    @Public()
    async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    @Patch('/change-password')
    async changePassword(
        @User() user: IUser,
        @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
    ): Promise<boolean> {
        return this.authService.changePassword(user._id, changePasswordDto);
    }
}
