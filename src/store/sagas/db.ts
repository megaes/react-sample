import { put, delay, select, call } from "redux-saga/effects";
import {deserializeDB, serializeDB, updateObjectInArray} from "../utils";
import { AnyAction } from 'redux';
import { SagaIterator } from 'redux-saga';
import * as actionCreator from "../actions";

export function* init(): SagaIterator {
    yield delay(3000);
    yield put(actionCreator.setDB(deserializeDB()));
}

export function* save(action: AnyAction): SagaIterator {
    yield put(actionCreator.saveToDBStart());
    const db = yield select(state => state.db.db);
    yield delay(5000);
    const newDB = yield call(updateObjectInArray, db, action.index, action.obj);
    yield call(serializeDB, newDB);
    yield put(actionCreator.setDB(newDB));
    yield put(actionCreator.saveToDBFinish());
}