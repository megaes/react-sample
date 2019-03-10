import { takeEvery } from "redux-saga/effects";
import ActionType from '../actions/type';
import { SagaIterator } from 'redux-saga';
import * as sagaDB from "./db";

export function* watchDB(): SagaIterator {
    yield takeEvery(ActionType.INIT_DB, sagaDB.init);
    yield takeEvery(ActionType.SAVE_TO_DB, sagaDB.save);
}