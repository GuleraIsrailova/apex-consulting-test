import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(private jwtService:JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    try
    {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      this.jwtService.verify(token);
      return true;

    } catch (e){
      throw new HttpException('User not authorized',HttpStatus.UNAUTHORIZED);
    }
  }
}
