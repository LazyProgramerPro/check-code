import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SystemConfigService } from 'src/app/config/system/system-config.service';
import { ModelsService } from 'src/app/models/models.service';
import { User } from './schemas';
import { LoginResponse, RegisterResponse } from './dtos';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private systemConfig: SystemConfigService,
    private modelsService: ModelsService,
  ) {}

  async login(username, password): Promise<LoginResponse> {
    const user: User = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id };
    return {
      code: HttpStatus.OK,
      result: user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(username, password): Promise<RegisterResponse> {
    const user = await this.modelsService.userModel.create({
      username,
      password: this.hashPassword(password),
    });
    return {
      code: HttpStatus.CREATED,
      result: user,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.modelsService.userModel.findOne({
      username,
    });
    if (user) {
      if (this.comparePassword(password, user.password)) {
        //eslint-disable-next-line
        const { password, ...result } = user.toJSON();
        return result;
      }
    }
    return null;
  }

  async findById(userId: string) {
    const user = await this.modelsService.userModel.findById(userId);
    return user;
  }

  comparePassword(password, encryptPassword) {
    return bcrypt.compareSync(password, encryptPassword);
  }

  hashPassword(password) {
    return bcrypt.hashSync(password, this.systemConfig.passwordSalt);
  }
}
