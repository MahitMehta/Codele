import { combineReducers } from "redux";
import { IAction } from "../interfaces/action";
import { boardReducer, IBoardReducer } from "./board";
import { ITempBoardReducer, tempBoardReducer } from "./tempBoard";

export interface IRootReducer {
    default: IDefaultReducer,
    board: IBoardReducer,
    tempBoard: ITempBoardReducer,
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
    tempBoard: tempBoardReducer
});

export { reducers };