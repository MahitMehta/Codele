import { ISnackItem } from "../../components/Snackbar/SnackItem";
import { ESnackbarActions } from "../constants/snackbar";
import { IAction } from "../interfaces/action";

export interface ISnackbarReducer {
    snackItem?: ISnackItem
}

const initialState : ISnackbarReducer = {
};

const snackbarReducer = (state:ISnackbarReducer=initialState, action:IAction) : ISnackbarReducer => {
    switch(action.type) {
        case ESnackbarActions.SET_SNACKBAR_ITEM: {
            return { ...state, snackItem: action.payload }
        }
        default: {
            return state; 
        }
    }
};

export { snackbarReducer };