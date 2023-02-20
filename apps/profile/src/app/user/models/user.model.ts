import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {UserInterface} from "@apex-consulting-test/interfaces";

@Schema()
export class User extends Document implements UserInterface {

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
