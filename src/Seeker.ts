import { Request } from "./Request";

export default class Seeker {
  async start() {
    console.log("starting seeker", this);
    const request = new Request();
    request.authenticate();
  }
}