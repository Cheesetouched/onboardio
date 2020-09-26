import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserModel } from "../models/user";

const User = mongoose.model("User", UserModel);

export class AuthService {
  static loginUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      User.findOne({ email: email }, async (err, user) => {
        if (err) reject({ code: 500, message: err });
        if (user) {
          let verification = await bcrypt.compare(password, user.password);
          if (verification)
            resolve(jwt.sign({ email: user.email }, process.env.JWT_SECRET));
          else reject({ code: 401, message: "Incorrect credentials." });
        } else reject({ code: 404, message: "User does not exist." });
      });
    });
  }

  static registerUser(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        let hashedPassword = await bcrypt.hash(password, 10);
        let newUser = User({ email: email, password: hashedPassword });
        newUser.save((err, done) => {
          if (err) reject({ code: 500, message: err });
          resolve(jwt.sign({ email: done.email }, process.env.JWT_SECRET));
        });
      } else reject({ code: 409, message: "User already exists." });
    });
  }
}
