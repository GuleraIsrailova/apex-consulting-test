import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./shemas/post.shema";
import {JwtModule} from "@nestjs/jwt";
import {getJWTConfig} from "../configs/access.jwt.configs";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema
      },
    ]),
    JwtModule.registerAsync(getJWTConfig()),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
