import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SystemConfigService } from '../config/system/system-config.service';
import { JwtPayload } from '../interfaces';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly systemConfig: SystemConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: systemConfig.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const { userId } = payload;
    const currentUser = await this.userService.findById(userId);
    if (!currentUser) throw new UnauthorizedException();
    //eslint-disable-next-line
    const { password, ...user } = currentUser.toJSON();
    return user;
  }
}
