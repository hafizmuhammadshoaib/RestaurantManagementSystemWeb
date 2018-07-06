// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import {createLogger} from 'redux-logger';

// reducers
import AuthReducer from "./Reducers/AuthRducer";
import DatabaseReducer from "./Reducers/DatabaseReducer";
import KitchenReducer from "./Reducers/KitchenReducer";
// epics
import { AuthEpic } from "./Epics/AuthEpic";
import { DatabaseEpic } from "./Epics/DatabaseEpic";
import {KitchenEpic} from "./Epics/KitchenEpic";
import AuthActions from "./Actions/AuthActions";
import DatabaseActions from "./Actions/DatabaseActions";
import { loadState, saveState } from "../PersistState";

const loggerMiddleware = createLogger();

// const persistedState = loadState();

// Application Reducers
const rootReducer = combineReducers({
  AuthReducer,
  DatabaseReducer,
  KitchenReducer

});

export const rootEpic = combineEpics(
  AuthEpic.createUserOnFirebase,
  AuthEpic.updateUserProfile,
  AuthEpic.authStateChanged,
  AuthEpic.signInUserFromFirebase,
  AuthEpic.singOutUserFromFirebase,
  DatabaseEpic.addDonorOnFirebase,
  DatabaseEpic.getDonorFromFirebae,
  KitchenEpic.getKitchenOrdersFromFirebase
  // more epics functions go here
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware,loggerMiddleware);

export let store = createStore(
  rootReducer,
  
  createStoreWithMiddleware,
);
store.subscribe(() => {
  saveState(store.getState());
});
