import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username: username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // create user token (Secret + Payload)
            const payload = { username: username };
            const accessToken = await this.jwtService.sign(payload);


            return { accessToken };
        } else {
            throw new UnauthorizedException('logIn failed');
        }
    }
}