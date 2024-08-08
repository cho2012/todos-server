import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload; // 또는 필요한 사용자 타입으로 변경
  }
}
