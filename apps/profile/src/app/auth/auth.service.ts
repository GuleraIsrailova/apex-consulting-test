import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "../user/repositories/user.repository";
import {UserEntity} from "../user/entities/user.entity";
import {compare, genSalt, hash} from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {ProfileLogin, ProfileRefreshTokens, ProfileRegister} from "@apex-consulting-test/contracts";

@Injectable()
export class AuthService {
  constructor(
              private readonly userRepository:UserRepository,
              private jwtService: JwtService,
              private configService: ConfigService,
              ) {}

  async register ({ email, password }: ProfileRegister.Request) {
      const oldUser = await this.userRepository.findUserByEmail(email);
      if(oldUser) {
        throw new HttpException ('User already exists',HttpStatus.BAD_REQUEST);
      }
      const tokens = this.generateTokens({email})
      const newUserEntity = await new UserEntity({
        email,
        passwordHash: await hash(password, await genSalt(10)),
        refreshToken: tokens.refreshToken,
      });

     const newUser = await this.userRepository.createUser(newUserEntity);

      return {
        email: newUser.email,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
  }

  async login ({ email, password }: ProfileLogin.Request) {
      const user = await this.validateUser(email, password);
      const tokens = this.generateTokens({email});
      user.refreshToken = tokens.refreshToken;
      await this.userRepository.updateUser(user);
      return {
        email: user.email,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        }
  }

  async refresh({ refreshToken }: ProfileRefreshTokens.Request) {
       if(!refreshToken) {
         throw new UnauthorizedException({message:'csdcf'});
       }
       const userData = this.validateRefreshToken(refreshToken);
       const user = await this.userRepository.findUserByRefreshToken(refreshToken);

        if (!userData || !user) {
          throw new UnauthorizedException();
        }
      const email = user.email
      const tokens = this.generateTokens({ email });
      user.refreshToken = tokens.refreshToken;
      await this.userRepository.updateUser(user);
      return {
        email: email,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
  }

  async validateUser (email:string, password:string) {
      const user = await this.userRepository.findUserByEmail(email);
      if(!user) {
        throw new UnauthorizedException ({ message: 'Wrong login or password' });
      }
      const isCorrectPassword = compare(password, user.passwordHash);
      if(!isCorrectPassword) {
        throw new UnauthorizedException ({ message: 'Wrong login or password' });
      }
      return user;
  }

  private generateTokens(payload) {
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '30d',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });

      return {
        accessToken,
        refreshToken
      }
  }

  private validateAccessToken(token) {
      try {
        return this.jwtService.verify(token, this.configService.get('ACCESS_TOKEN_SECRET'));
      } catch (e) {
        return null;
      }
  }

  private async validateRefreshToken(token) {
      try {
        return this.jwtService.verify(token, this.configService.get('REFRESH_TOKEN_SECRET'));
      } catch (e) {
        return null;
      }
  }

}
