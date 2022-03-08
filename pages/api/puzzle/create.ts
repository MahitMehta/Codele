import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // const generator = edge.func(require('path').join(__dirname, 'csharp/Generator.cs'));
    // console.log(generator);
    res.status(200).json({ status: 'Created Puzzle.' })
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                