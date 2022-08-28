import {LambdaClient} from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({
  region: process.env.CODLE_AWS_DEFAULT_REGION!,
  credentials: {
    accessKeyId: process.env.CODLE_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CODLE_AWS_SECRET_ACCESS_KEY!,
  },
});

export default lambdaClient;
