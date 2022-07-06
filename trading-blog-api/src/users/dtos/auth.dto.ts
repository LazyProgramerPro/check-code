import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/app/dtos';
import { User } from '../schemas';

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class LoginResponse extends BaseResponse<User> {
  @ApiProperty()
  accessToken: string;
}
