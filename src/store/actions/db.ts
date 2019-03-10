import ActionType from './type';
import Data from '../../classes/Data';
import { AnyAction } from 'redux';

export function initDB(): AnyAction {
    return {
        type: ActionType.INIT_DB,
    }
}

export function setDB(db: Data[]): AnyAction {
    return {
        type: ActionType.SET_DB,
        db
    }
}

export function saveToDBStart(): AnyAction {
    return {
        type: ActionType.SAVE_TO_DB_START,
    }
}

export function saveToDBFinish(): AnyAction {
    return {
        type: ActionType.SAVE_TO_DB_FINISH,
    }
}

export function saveToDB(index: number, obj: Data): AnyAction {
    return {
        type: ActionType.SAVE_TO_DB,
        index,
        obj
    }
}
