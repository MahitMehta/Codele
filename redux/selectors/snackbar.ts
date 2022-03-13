import { IRootReducer } from "../reducers";

export const getSnackItem = (state:IRootReducer) => state.snackbar.snackItem;