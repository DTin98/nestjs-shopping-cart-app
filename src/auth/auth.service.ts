import { BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as moment from 'moment';

import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignOptions } from 'jsonwebtoken';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import { ROLE } from 'src/user/enums/role.enum';
import { IUser } from 'src/user/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { STATUS } from 'src/user/enums/status.enum';
import { SignInDto } from './dto/signin.dto';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { USER_SENSITIVE_FIELDS } from 'src/user/enums/protected-fields.enum';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { IUserToken } from '../token/interfaces/user-token.interface';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    private readonly clientAppUrl: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly configService: ConfigService,
        private mailerService: MailerService,
        @InjectConnection() private readonly connection: mongoose.Connection
    ) {
        this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
    }

    async signUp(createUserDto: CreateUserDto): Promise<IReadableUser> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const user = await this.userService.findByEmail(createUserDto.email);
            if (user)
                throw new BadRequestException("Email is existed");

            const createdUser = await this.userService.create(createUserDto, [ROLE.user], { session });
            const token = await this.signUser(createdUser, false);
            const readableUser = createdUser.toObject() as IReadableUser;
            readableUser.accessToken = token;
            await this.sendConfirmation(createdUser, token);
            await session.commitTransaction();
            return _.omit<IReadableUser>(readableUser, Object.values(USER_SENSITIVE_FIELDS)) as IReadableUser;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
        const user = await this.userService.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await this.signUser(user);
            const readableUser = user.toObject() as IReadableUser;
            readableUser.accessToken = token;

            return _.omit<IReadableUser>(readableUser, Object.values(USER_SENSITIVE_FIELDS)) as IReadableUser;
        }
        throw new BadRequestException('Invalid credentials');
    }

    async signUser(user: IUser, withStatusCheck: boolean = true): Promise<string> {
        if (withStatusCheck && (user.status !== STATUS.active)) {
            throw new BadRequestException("User has not active yet");
        }
        const tokenPayload: ITokenPayload = {
            _id: user._id,
            status: user.status,
            roles: user.roles,
        };
        const token = await this.generateToken(tokenPayload);
        const expireAt = moment()
            .add(1, 'day')
            .toISOString();

        await this.saveToken({
            token,
            expireAt,
            uId: user._id,
        });

        return token;
    }

    async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
        const password = await this.userService.hashPassword(changePasswordDto.password);

        await this.userService.update(userId, { password });
        await this.tokenService.deleteAll(userId);
        return true;
    }

    async confirm(token: string): Promise<IUser> {
        const data = await this.verifyToken(token);
        const user = await this.userService.findOne(data._id);

        await this.tokenService.delete(data._id, token);

        if (user && user.status === STATUS.pending) {
            user.status = STATUS.active;
            return user.save();
        }
        throw new BadRequestException('Confirmation error');
    }

    async sendConfirmation(user: IUser, token: string) {
        const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            from: this.configService.get<string>('JS_CODE_MAIL'),
            to: user.email,
            subject: 'Verify User',
            html: `
                <h3>Hello ${user.firstName}!</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `,
        });
    }

    private async generateToken(data: ITokenPayload, options?: SignOptions): Promise<string> {
        return this.jwtService.sign(data, options);
    }

    private async verifyToken(token): Promise<any> {
        const data = this.jwtService.verify(token) as ITokenPayload;
        const tokenExists = await this.tokenService.exists(data._id, token);

        if (tokenExists) {
            return data;
        }
        throw new UnauthorizedException();
    }

    private saveToken(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
        return this.tokenService.create(createUserTokenDto);
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        const user = await this.userService.findByEmail(forgotPasswordDto.email);
        if (!user) {
            throw new BadRequestException('Invalid email');
        }
        const token = await this.signUser(user);
        const forgotLink = `${this.clientAppUrl}/auth/forgotPassword?token=${token}`;

        await this.mailerService.sendMail({
            from: this.configService.get<string>('JS_CODE_MAIL'),
            to: user.email,
            subject: 'Forgot Password',
            html: `
                <h3>Hello ${user.firstName}!</h3>
                <p>Please use this <a href="${forgotLink}">link</a> to reset your password.</p>
            `,
        });
    }
}
