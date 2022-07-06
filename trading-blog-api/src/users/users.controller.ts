import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CurrentUser } from 'src/app/decorators';
import { JwtAuthGuard } from 'src/app/guards';
import { LoginDto, LoginResponse } from './dtos';
import { UsersService } from './users.service';
import { User } from './schemas';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('login')
  @ApiOkResponse({
    type: LoginResponse,
  })
  async login(
    @Body() { username, password }: LoginDto,
  ): Promise<LoginResponse> {
    return this.userService.login(username, password);
  }

  @Post('register')
  async register(@Body() { username, password }: LoginDto) {
    return this.userService.register(username, password);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }
}
