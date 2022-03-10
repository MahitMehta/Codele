import { LambdaClient } from "@aws-sdk/client-lambda";
require("dotenv").config();

const lambdaClient = new LambdaClient({ 
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    }
});

export default lambdaClient; 