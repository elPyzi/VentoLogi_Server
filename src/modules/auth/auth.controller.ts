import { CreateUserDto } from '@modules/users';
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
import { AuthService } from '@modules/auth';
import { AUTH_MODULE_ENDPOINTS } from '@modules/auth/constants';
import { ms } from '@/utils';
import { DAY, HOUR } from '@shared/constants';
import { ResetPasswordDto } from '@modules/auth/dto/reset-password.dto';
import { ResetPasswordInitDto } from '@modules/auth/dto/resetPasswordInit.dto';

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

    const { accessToken, refreshToken, result } = await this.authService.login(
      req.user,
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: ms.hours(HOUR),
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms.days(DAY),
    });

    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AUTH_MODULE_ENDPOINTS.LOGOUT)
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req: ERequest) {
    if (!req.token) throw new InternalServerErrorException();

    return await this.authService.logout(req.token);
  }

  @Get(AUTH_MODULE_ENDPOINTS.REFRESH)
  @HttpCode(HttpStatus.OK)
  async refresh(@Request() req: ERequest, @Response() res: EResponse) {
    const refreshToken: string = req.cookies['refreshToken'];
    const { accessToken } = await this.authService.refresh(refreshToken);
    if (!accessToken) throw new InternalServerErrorException();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: ms.hours(HOUR),
    });

    return res.json();
  }

  @Post(AUTH_MODULE_ENDPOINTS.RESET_PASSWORD.INIT)
  @HttpCode(HttpStatus.ACCEPTED)
  async resetPasswordInit(@Body() resetPasswordInitDto: ResetPasswordInitDto) {
    return await this.authService.resetPasswordInit(resetPasswordInitDto);
  }

  @Post(AUTH_MODULE_ENDPOINTS.RESET_PASSWORD.VERIFY)
  @HttpCode(HttpStatus.OK)
  async resetPasswordVerify(@Body() verifyInfo: VerifyUserDto) {
    return await this.authService.resetPasswordVerify(verifyInfo);
  }

  @Post(AUTH_MODULE_ENDPOINTS.RESET_PASSWORD.RESET)
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }
}
