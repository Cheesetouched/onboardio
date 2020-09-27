import { Request } from "express";
import { UserInterface } from "../interfaces/user";

export interface HeaderMiddleware extends Request {
  user: UserInterface;
}
