import {UserInterface} from "@apex-consulting-test/interfaces";

export class UserEntity implements UserInterface {
  email: string;
  passwordHash: string;
  refreshToken: string;

  constructor(user: UserInterface) {
    this.passwordHash = user.passwordHash;
    this.email = user.email;
    this.refreshToken = user.refreshToken;
  }
}
