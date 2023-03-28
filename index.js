import { SecretsManager } from "@aws-sdk/client-secrets-manager";
import dotenv from "dotenv";
dotenv.config();

console.log("process.env.REGION: ", process.env.REGION);
console.log("process.env.SECRET_NAME: ", process.env.SECRET_NAME);
console.log("process.env.ACCESS_KEY_ID: ", process.env.ACCESS_KEY_ID);
console.log("process.env.SECRET_ACCESS_KEY: ", process.env.SECRET_ACCESS_KEY);
//const decodedBinarySecret;
/* AWS.config.credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
}; */
// Create a Secrets Manager client
let client = new SecretsManager({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
export default {
  load: async () => {
    let data = await client
      .getSecretValue({
        SecretId: process.env.SECRET_NAME,
      });

    let envvars = JSON.parse(data.SecretString);
    //console.log(envvars);
    let keys = Object.keys(envvars);
    keys.forEach((k) => {
      process.env[k] = envvars[k];
    });
  },
};
