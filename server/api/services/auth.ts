import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../models/user";

const User = mongoose.model("User", UserModel);

export class AuthService {
  static loginUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      User.findOne({ email: email, password: password }, (err, user) => {
        if (err) reject({ code: 500, message: err });
        if (user)
          resolve(jwt.sign({ email: user.email }, process.env.JWT_SECRET));
        else reject({ code: 401, message: "Incorrect credentials." });
      });
    });
  }

  static registerUser(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        let newUser = User({ email: email, password: password });
        newUser.save((err, done) => {
          if (err) reject({ code: 500, message: err });
          resolve(jwt.sign({ email: done.email }, process.env.JWT_SECRET));
        });
      } else reject({ code: 409, message: "User already exists." });
    });
  }
}
