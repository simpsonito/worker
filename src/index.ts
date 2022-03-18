import * as mongoose from "mongoose";
import { loadConfigs } from "./configs";
import { EventResult } from "./models";
import Seeker from "./Seeker";

class Worker {
  constructor() {
    console.log("Worker starting");
    const { mongoAddress } = loadConfigs();
    this.connectDatabase(mongoAddress);
    const worker = new Seeker();
    worker.start();
  }

  async connectDatabase(url: string) {
    await mongoose.connect(url);
    console.log("Connected to database");
    const events = await EventResult.find();
    console.log("Previous Events", events);
  }
}
new Worker();