import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MailModule, PrismaModule, RedisModule } from '@shared/modules';
import configuration from '@config/app/configuration';
import { validateConfig } from '@utils/validateConfig';
import { AuthModule } from '@modules/auth';
import { UsersModule } from '@modules/users';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateConfig,
    }),
    JwtModule.register({ global: true }),
    PrismaModule,
    RedisModule,
    MailModule,
    PassportModule.register({ defaultStrategy: 'jwt', global: true }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
        }),
    },
  ],
})
export class AppModule {}
