import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

let service = Schema({
  name: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

let flow = Schema({
  name: {
    type: String,
    required: true,
  },
  services: [Schema.Types.ObjectId],
});

export const UserModel = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  services: {
    type: [service],
    default: [],
  },
  flows: {
    type: [flow],
    default: [],
  },
});
