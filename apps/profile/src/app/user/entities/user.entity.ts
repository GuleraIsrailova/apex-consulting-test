import { compare, genSalt, hash } from 'bcryptjs';
import {UserInterface} from "@apex-consulting-test/interfaces";

export class UserEntity implements UserInterface {
  _id?: string;
  email: string;
  passwordHash: string;

  constructor(user: UserInterface) {
    this._id = user._id;
    this.passwordHash = user.passwordHash;
    this.email = user.email;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }

}
