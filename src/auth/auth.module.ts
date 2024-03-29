import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { configModule } from '../configure.root';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { MailModule } from 'src/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UserModule,
    TokenModule,
    configModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.SYSTEM_EMAIL_USERNAME,
          pass: process.env.SYSTEM_EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
