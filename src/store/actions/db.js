import * as actionType from './type';
import {serializeDB, deserializeDB, updateObjectInArray} from "../utils";

export const initDB = () => {
    return dispatch => {
        return new Promise(resolve => {
            setTimeout(() => resolve(deserializeDB()), 3000);
        }).then(db => dispatch({ type: actionType.INIT_DB, db }))
    }
}

export const saveToDB = (index, obj) => {
    return (dispatch, getState) => {
        return new Promise(resolve => {
            setTimeout(() => {
                serializeDB(updateObjectInArray(getState().db.db, index, obj));
                resolve();
            }, 5000);
        }).then(() => dispatch({ type: actionType.SAVE_TO_DB, index, obj }))
    }
}
