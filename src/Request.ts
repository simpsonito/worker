import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { loadConfigs } from "./configs";
import { EventResult } from "./models";

interface AuthResponse {
  token: string;
}

export class Request {
  private userData: {
    email: string;
    password: string;
  }
  private apiUrl: string;
  private token: string;
  constructor() {
    const { apiEmail, apiPassword, apiUrl } = loadConfigs();
    this.userData = {
      email: apiEmail,
      password: apiPassword,
    }
    this.apiUrl = apiUrl;
  }
  public async authenticate(delay: number = 1) {
    try {
      const response = await this.post<AuthResponse>(this.userData, "auth");
      this.reactToAuthenticationStatus(response.status, delay, response.data);
    } catch (e) {
      const status = (e as any)?.response?.status;
      this.reactToAuthenticationStatus(status, delay);
    }
  }
  reactToAuthenticationStatus(status: number, delay: number = 1, data: AuthResponse = null) {
    switch (status) {
      case 200:
        this.token = data.token;
        this.readyAndGo();
        break;
      case 401:// Invalid credentials
        console.error("Invalid credentials");
        throw "Invalid credentials";
      case 503://Server is busy.
        const newDelay = delay * 2;
        setTimeout(() => this.authenticate(newDelay), newDelay);
        break;
      default:
        console.error("Authentication unknown response", status);
        break;
    }
  }

  private readyAndGo() {
    this.getResults();
  }

  private async getResults() {
    try {
      const response = await this.get<EventResult>("results");
      this.reactToResultStatus(response.status, response.data);
    } catch (e) {
      const status = (e as any)?.response?.status;
      this.reactToResultStatus(status);
    }
  }
  private reactToResultStatus(status: number, data: EventResult = null) {
    switch (status) {
      case 200:
        const eventResultData = data;
        console.log("Got Event ResultData", eventResultData);
        const eventResult = new EventResult(eventResultData);
        eventResult.save();
        this.getResults();
        break;
      case 204://Server is busy.
        console.log("Results waiting...");
        this.getResults();
        break;
      case 401:// Invalid credentials
        console.log("Needs to renew credentials");
        this.authenticate();
        break;
      default:
        throw "Results unknown response " + status;
    }
  }

  protected async get<T = any>(endpoint: string): Promise<AxiosResponse<T>> {
    const result = await Axios.get<T>(endpoint, this.getReqConfig());
    return result;
  }
  protected async post<T = any>(obj: any, endpoint: string): Promise<AxiosResponse<T>> {
    const data = JSON.stringify(obj);
    const result = await Axios.post<T>(endpoint, data, this.getReqConfig());
    return result;
  }
  private getReqConfig(): AxiosRequestConfig {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": `Travsport Worker`,
      Authorization: `Bearer ${this.token}`,
    };
    return {
      baseURL: this.apiUrl,
      headers,
    };
  }
}