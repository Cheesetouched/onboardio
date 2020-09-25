import * as path from "path";
import * as dotenv from "dotenv";
import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as bodyCleaner from "express-body-cleaner";
import { AuthRoutes } from "./routes/auth";
import { RequestLogger } from "./middlewares/requestLogger";

class App {
  public app: express.Application;
  public mongourl: string;
  public auth: AuthRoutes = new AuthRoutes();
  public authRouter: express.Router = express.Router();

  constructor() {
    dotenv.config({ path: path.join(__dirname, "../") + ".env" });
    this.app = express();
    this.config();
    this.auth.routes(this.authRouter);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(RequestLogger);
    this.app.use(bodyCleaner);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use("/v1/auth", this.authRouter);
  }

  private mongoSetup(): void {
    this.mongourl = process.env.MONGODB;
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new App().app;
