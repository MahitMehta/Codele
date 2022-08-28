import { EPuzzleSymbols, puzzleSymbolMap } from "../maps/puzzle";

export const decodeSequence = (sequence: string[]) => {
    return sequence.map(symbol => {
        const decoded = Buffer.from(symbol, "base64").toString("utf8"); 
        return puzzleSymbolMap[decoded as EPuzzleSymbols];
    });
}