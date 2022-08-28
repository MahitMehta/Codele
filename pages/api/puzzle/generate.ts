import { NextApiRequest, NextApiResponse } from "next";

import lambdaClient from "../../../utils/aws/lambdaClient";
import {InvokeCommand} from "@aws-sdk/client-lambda";

const GENERATE_CODLE_FUNCTION_NAME = "GenerateCodle";

async function getNewPuzzle() : Promise<string[] | undefined> {
  const generateCodleCommand = new InvokeCommand({
    FunctionName: GENERATE_CODLE_FUNCTION_NAME,
  });

  const response = await lambdaClient.send(generateCodleCommand).catch(() => undefined);
  const newCodle = !!response ? JSON.parse(Buffer.from(response?.Payload as any).toString("utf-8")) : undefined;
  return newCodle?.puzzle;
}

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
  ) {
      const response = await getNewPuzzle().catch(() => null);
      if (!response || !response?.length) {
        res.status(500).json({ sequence: [] });
        return; 
      }

      const encodedSequence = response.map((symbol) => Buffer.from(symbol).toString("base64")); 
      res.status(200).json({ sequence: encodedSequence });
  };