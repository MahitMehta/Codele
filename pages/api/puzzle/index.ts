import type { NextApiRequest, NextApiResponse } from 'next'
import db from "../../../utils/db";
import moment from "moment-timezone";
import { firestore } from "firebase-admin";
import lambdaClient from "../../../utils/aws/lambdaClient";
import { InvokeCommand } from "@aws-sdk/client-lambda"; 

type Data = {
    sequence: string[],
    timestamp?: string; 
}

interface IPuzzle extends firestore.DocumentData {
    sequence: string[]; 
    timestamp: firestore.Timestamp
}

const DEFAULT_TIMEZONE = "America/New_York"; // EST

export async function getPuzzleHandler() : Promise<Data> {
    const puzzles = db.collection("puzzles");

    const startDate = moment().tz(DEFAULT_TIMEZONE).startOf("day").toDate();
    const endDate = moment().tz(DEFAULT_TIMEZONE).endOf("day").toDate();

    const { docs, size } = await puzzles.orderBy("timestamp").startAt(startDate).endBefore(endDate).limit(1).get();
    
    if (size) {
        const { sequence, timestamp } : IPuzzle = docs[0].data() as IPuzzle; 
        return { sequence, timestamp: timestamp.toDate().toUTCString() };
    } else {
        const generateCodleCommand = new InvokeCommand({
            FunctionName: "GenerateCodle",
        });
    
        const { Payload:newCodlePayload } = await lambdaClient.send(generateCodleCommand);
        const newCodle =  JSON.parse(Buffer.from(newCodlePayload as any).toString("utf-8"));

        const startOfDay = moment.tz(DEFAULT_TIMEZONE).startOf("day"); // seconds
        const startOfDayUnixTS = startOfDay.unix();

        puzzles.add({ 
            sequence: newCodle.puzzle,
            timestamp: new firestore.Timestamp(startOfDayUnixTS, 0),
        })

        return { sequence: newCodle.puzzle, timestamp: startOfDay.toDate().toUTCString() };
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const response = await getPuzzleHandler();
    res.status(200).json(response || { sequence: [] });
}