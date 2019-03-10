import ActionType from '../actions/type';
import { AnyAction } from 'redux';
import Data from '../../classes/Data';

export class State {
    public db: Data[] = [];
    public saving: boolean = false;
};

export function reducer(state: State = new State(), action: AnyAction): State {
    switch (action.type) {
        case ActionType.SET_DB:
            return {
                ...state,
                db: action.db
            }
        case ActionType.SAVE_TO_DB_START:
            return {
                ...state,
                saving: true
            }
        case ActionType.SAVE_TO_DB_FINISH:
            return {
                ...state,
                saving: false
            }
        default:
            return state;
    }
};

