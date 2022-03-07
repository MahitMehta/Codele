import { EKeyType } from "../enums/keyType";

export interface IKey {
    symbol: string; 
    type: EKeyType,
    icon?: JSX.Element
}
