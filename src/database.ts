import * as mongoose from "mongoose";

export class Database {
  public static async connect(url: string) {
    await mongoose.connect(url);
    console.log("Connected to database", url);
  }
  public static async disconnect() {
    await mongoose.disconnect();
  }
}