
import type { NextApiRequest, NextApiResponse } from 'next'
require("dotenv").config();

type Data = {
    revalidated: boolean; 
    message?: string; 
    error?: boolean; 
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.query.secret !== process.env.CODLE_FORCE_REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token', revalidated: false, error: false })
    }

    try {
        await res.unstable_revalidate('/')
        return res.json({ revalidated: true, error: false })
    } catch (err) {
        return res.status(500).send({ revalidated: false, error: true });
    }
}
