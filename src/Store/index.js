// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import {createLogger} from 'redux-logger';

// reducers
import AuthReducer from "./Reducers/AuthRducer";
import KitchenReducer from "./Reducers/KitchenReducer";
import TableReducer from "./Reducers/TableReducer";
import MenuReducer from "./Reducers/MenuReducer";
// epics
import { AuthEpic } from "./Epics/AuthEpic";
import {KitchenEpic} from "./Epics/KitchenEpic";
import { TableEpic } from "./Epics/TableEpic";
import { MenuEpic } from "./Epics/MenuEpic";


import AuthActions from "./Actions/AuthActions";
import { loadState, saveState } from "../PersistState";
import { Menu } from "@material-ui/core";

// const persistedState = loadState();
const loggerMiddleware = createLogger();
// Application Reducers
const rootReducer = combineReducers({
  TableReducer,
  AuthReducer,
  KitchenReducer,
  MenuReducer,

});

export const rootEpic = combineEpics(
  TableEpic.getTablesDataReq,
  AuthEpic.createUserOnFirebase,
  AuthEpic.updateUserProfile,
  AuthEpic.authStateChanged,
  AuthEpic.signInUserFromFirebase,
  AuthEpic.singOutUserFromFirebase,
  KitchenEpic.getKitchenOrdersFromFirebase,
  MenuEpic.getMenuDataReq
  // more epics functions go here
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware,loggerMiddleware);

export let store = createStore(
  rootReducer,
  createStoreWithMiddleware,
);
store.subscribe(() => {
  // saveState(store.getState());
});
