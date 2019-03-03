import * as actionType from '../actions/type';
import {updateObjectInArray} from "../utils";

const initialState = {
    db: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.INIT_DB:
            return {
                db: action.db
            }
        case actionType.SAVE_TO_DB:
            return {
                db: updateObjectInArray(state.db, action.index, action.obj)
            }
        default:
            return state;
    }
};

export default reducer;
