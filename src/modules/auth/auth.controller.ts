import { CreateUserDto, User } from '@modules/users';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Response,
  InternalServerErrorException,
  Get,
} from '@nestjs/common';
import { Request as ERequest, Response as EResponse } from 'express';
import { VerifyUserDto } from '@modules/auth/dto';
import { JwtAuthGuard, LocalAuthGuard } from '@shared/guards';
import { DAY, FIFTEEN_MINUTES } from '@shared/constants';
import { AuthService } from '@modules/auth';
import { AUTH_MODULE_ENDPOINTS } from '@modules/auth/constants';
import { TToken } from '@shared/models';

@Controller(AUTH_MODULE_ENDPOINTS.BASIC)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AUTH_MODULE_ENDPOINTS.REGISTER.INIT)
  @HttpCode(HttpStatus.ACCEPTED)
  async registerInit(@Body() user: CreateUserDto) {
    return await this.authService.registerInit(user);
  }

  @Post(AUTH_MODULE_ENDPOINTS.REGISTER.VERIFY)
  @HttpCode(HttpStatus.CREATED)
  async registerVerify(@Body() verifyInfo: VerifyUserDto) {
    return await this.authService.registerVerify(verifyInfo);
  }

  @UseGuards(LocalAuthGuard)
  @Post(AUTH_MODULE_ENDPOINTS.LOGIN.LOCAL)
  @HttpCode(HttpStatus.OK)
  async loginByLocalStrategy(
    @Request() req: ERequest,
    @Response() res: EResponse,
  ) {
    if (!req.user) throw new InternalServerErrorException();

    const { accessToken, refreshToken } = await this.authService.login(
      req.user as User,
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: FIFTEEN_MINUTES,
    });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: DAY });

    return res.json(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AUTH_MODULE_ENDPOINTS.LOGOUT)
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req: ERequest) {
    if (!req.user) throw new InternalServerErrorException();

    return await this.authService.logout(req.user as TToken);
  }

  @Get(AUTH_MODULE_ENDPOINTS.REFRESH)
  @HttpCode(HttpStatus.OK)
  async refresh(@Request() req: ERequest, @Response() res: EResponse) {
    const refreshToken: string = req.cookies.get('refreshToken');
    const { accessToken } = await this.authService.refresh(refreshToken);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: FIFTEEN_MINUTES,
    });
  }
}
