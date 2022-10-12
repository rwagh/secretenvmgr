import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

//const decodedBinarySecret;
AWS.config.credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
// Create a Secrets Manager client
let client = new AWS.SecretsManager({
  region: process.env.REGION,
});
export default {
  load: async () => {
    let data = await client
      .getSecretValue({
        SecretId: process.env.SECRET_NAME,
      })
      .promise();

    let envvars = JSON.parse(data.SecretString);
    //console.log(envvars);
    let keys = Object.keys(envvars);
    keys.forEach((k) => {
      process.env[k] = envvars[k];
    });
  },
};
