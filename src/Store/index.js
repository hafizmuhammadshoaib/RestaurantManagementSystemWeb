// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import {createLogger} from 'redux-logger';

// reducers
import AuthReducer from "./Reducers/AuthRducer";
import TableReducer from "./Reducers/TableReducer";
// epics
import { AuthEpic } from "./Epics/AuthEpic";
import { DatabaseEpic } from "./Epics/DatabaseEpic";
import { TableEpic } from "./Epics/TableEpic";

import AuthActions from "./Actions/AuthActions";
import DatabaseActions from "./Actions/DatabaseActions";
import { loadState, saveState } from "../PersistState";

// const persistedState = loadState();
const loggerMiddleware = createLogger();
// Application Reducers
const rootReducer = combineReducers({
  TableReducer,
  AuthReducer,
});

export const rootEpic = combineEpics(
  TableEpic.getTablesDataReq,
  AuthEpic.createUserOnFirebase,
  AuthEpic.updateUserProfile,
  AuthEpic.authStateChanged,
  AuthEpic.signInUserFromFirebase,
  AuthEpic.singOutUserFromFirebase,
  DatabaseEpic.addDonorOnFirebase,
  DatabaseEpic.getDonorFromFirebae,
  // more epics functions go here
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware,loggerMiddleware);

export let store = createStore(
  rootReducer,
  // persistedState,
  createStoreWithMiddleware,
);
store.subscribe(() => {
  // saveState(store.getState());
});
