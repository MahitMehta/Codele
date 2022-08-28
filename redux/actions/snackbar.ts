import { ISnackItem } from "../../components/Snackbar/SnackItem";
import { ESnackbarActions, ISetSnackbarItem } from "../constants/snackbar";

export const setSnackbarItem = (payload?:ISnackItem) : ISetSnackbarItem => ({
    type: ESnackbarActions.SET_SNACKBAR_ITEM,
    payload
})