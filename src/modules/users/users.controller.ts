import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@shared/guards';
import { Request as ERequest } from 'express';
import { USERS_MODULE_ENDPOINTS } from './constants';

@Controller(USERS_MODULE_ENDPOINTS.BASIC)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(USERS_MODULE_ENDPOINTS.ME)
  async me(@Req() req: ERequest) {
    const id = req.user?.id;
    if (!id) throw new NotFoundException('Not Found');
    return this.usersService.me(id);
  }
}
