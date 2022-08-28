import { ISnackItem } from "../../components/Snackbar/SnackItem";

export enum ESnackbarActions {
    SET_SNACKBAR_ITEM = "SET_SNACKBAR_ITEM"
}

export interface ISetSnackbarItem {
    type: ESnackbarActions.SET_SNACKBAR_ITEM,
    payload?: ISnackItem
}