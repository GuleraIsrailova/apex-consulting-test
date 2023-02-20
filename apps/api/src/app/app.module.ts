import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {RMQModule} from "nestjs-rmq";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {getRMQConfig} from "./configs/rmq.config";
import {AuthController} from "./controllers/auth.controller";
import {getJWTConfig} from "./configs/access.jwt.configs";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'environments/.api.env',
      isGlobal: true,
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule,
  ],
  controllers: [AuthController]
})
export class AppModule {}
