import { BaseResponse } from 'src/app/dtos';
import { User } from '../schemas';

export class RegisterDto {}

export class RegisterResponse extends BaseResponse<User> {}
