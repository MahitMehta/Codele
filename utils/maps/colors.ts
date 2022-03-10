import { ESymbolStatus } from "../../components/GameBoard/enums/symbolStatus";

export const pieceColorMap : { [ K in ESymbolStatus ]: string } = {
    [ ESymbolStatus.INCORRECT ]: "#FF6335",
    [ ESymbolStatus.PARTIAL ]: "#E7C833",
    [ ESymbolStatus.UNKNOWN ]: "transparent",
    [ ESymbolStatus.CORRECT ]: "#6DE879",
}