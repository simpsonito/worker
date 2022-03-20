import { loadConfigs } from "./configs";
import { Database } from "./database";
import Seeker from "./Seeker";
import { EventResult } from "./models";


class Worker {
  constructor() {
    console.log("Worker starting");
    const { mongoAddress } = loadConfigs();
    Database.connect(mongoAddress);
    this.getSavedEvents();
    const worker = new Seeker();
    worker.start();
  }
  async getSavedEvents() {
    const events = await EventResult.find();
    console.log("Previous Events", events);
    return events;
  }
}
new Worker();