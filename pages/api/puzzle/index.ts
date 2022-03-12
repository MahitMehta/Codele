import type { NextApiRequest, NextApiResponse } from 'next'
import db from "../../../utils/db";
import moment from "moment-timezone";
import { firestore } from "firebase-admin";

type Data = {
    sequence: string[],
    timestamp?: string | null; 
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
    
    if (!size) {
        const { sequence, timestamp } : IPuzzle = docs[0].data() as IPuzzle; 
        return { sequence, timestamp: timestamp.toDate().toUTCString() };
    } else {
        const { docs, size } = await puzzles.orderBy("timestamp", "desc").limit(1).get();
        if (!size) {
            return { sequence: [], timestamp: null };
        }
        const { sequence, timestamp } : IPuzzle = docs[0].data() as IPuzzle; 
        return { sequence, timestamp: timestamp.toDate().toUTCString() };
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const response = await getPuzzleHandler();
    res.status(200).json(response || { sequence: [], timestamp: null });
}