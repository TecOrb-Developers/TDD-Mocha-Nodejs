import { Schema, model } from 'mongoose';

interface userSession {
  deviceType: string;
  deviceIp: string;
  timezone: string;
  language: string;
  currentVersion: string;
  deviceToken: string;
  role: String;
  status: boolean,
  isDelete: boolean,
  jwtToken: String,
  userId: String
}

const schema = new Schema<userSession>({
  deviceType: { type: String },
  deviceIp: { type: String },
  timezone: { type: String },
  language: { type: String, default: "en" },
  currentVersion: { type: String, default: '1.0.1' },
  deviceToken: { type: String },
  role: { type: String },  //Admin, Vendor , Customer
  status: { type: Boolean, default: true },
  jwtToken: { type: String },
  userId: { type: String },
  isDelete: { type: Boolean, default: false },
},
  {
    timestamps: true,
    versionKey: false
  });

const userSessionModel = model<userSession>('userSessions', schema);
export = userSessionModel