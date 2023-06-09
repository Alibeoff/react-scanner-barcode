import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne({
      email: createUserDto.email,
    });
    if (user) throw new BadRequestException('Пользователь уже существует!');

    const createdUser = await this.usersService.create(createUserDto);
    return {
      access_token: await this.jwtService.signAsync({
        id: createdUser.id,
        username: createdUser.name,
      }),
    };
  }
  async login(email: string, password: string) {
    const user = await this.usersService.findOne({ email });
    if (user?.password !== password) {
      throw new UnauthorizedException('Ошибка авторизации!');
    }
    const payload = { id: user.id, username: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
  async generateTokens() {
    return;
  }
}
