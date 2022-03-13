import { combineReducers } from "redux";
import { IAction } from "../interfaces/action";
import { boardReducer, IBoardReducer } from "./board";
import { ISnackbarReducer, snackbarReducer } from "./snackbar";
import { ITempBoardReducer, tempBoardReducer } from "./tempBoard";

export interface IRootReducer {
    default: IDefaultReducer,
    board: IBoardReducer,
    tempBoard: ITempBoardReducer,
    snackbar: ISnackbarReducer,
}

interface IDefaultReducer {}

const initialState : IDefaultReducer = {};

const defaultReducer = (state:IDefaultReducer=initialState, action:IAction) : IDefaultReducer => {
    switch(action.type) {
        default: {
            return state; 
        }
    }
};

const reducers = combineReducers({
    default: defaultReducer,
    board: boardReducer,
    snackbar: snackbarReducer,
    tempBoard: tempBoardReducer
});

export { reducers };