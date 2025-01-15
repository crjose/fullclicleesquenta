import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './login.dto';
import { InvalidCredentialsError } from './errors';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user || !bcrypt.compareSync(dto.password, user.password)) {
      throw new InvalidCredentialsError();
    }

    const payload = {
      user: user.id,
      role: user.role,
    };

    return {
      acess_token: this.jwtService.sign(payload),
    };
  }
}
