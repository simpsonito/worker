import { config, DotenvConfigOutput } from "dotenv";

let loadEnvs: DotenvConfigOutput;
export function loadConfigs() {
  if (!loadEnvs) {
    loadEnvs = config();
    if (loadEnvs.error) {
      throw loadEnvs.error;
    }
  }
  const { mongo_address, api_url, api_email, api_password } = process.env
  return {
    mongoAddress: mongo_address,
    apiUrl: api_url,
    apiEmail: api_email,
    apiPassword: api_password,
  }
}