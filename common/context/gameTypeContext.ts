import { createContext } from "react";
import { EGameType } from "../../redux/enums/gameType";

export const GameTypeContext = createContext({
    type: EGameType.UNLIMITED
})