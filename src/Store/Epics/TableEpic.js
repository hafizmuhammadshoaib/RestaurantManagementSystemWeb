import AuthActions from "../Actions/AuthActions";
import TableActions from "../Actions/TableActions";
import { Observable } from "rxjs";
import {getTablesData}from '../Firebase/firebaseDB';
import { retry } from "rxjs/operator/retry";


export class TableEpic{
    static getTablesDataReq(action$){
        return action$.ofType(TableActions.LOAD_TABLES)
                .switchMap(({payload})=>{
                    return Observable.fromPromise(getTablesData(payload))
                            .map((obj)=>{
                                console.log("tables data fetched: " , obj);
                                return{
                                    type: TableActions.LOAD_TABLES_DONE,
                                    payload: obj
                                }
                            }).catch((error)=>{
                                return Observable.of(TableActions.getTablesDataErr(error.message))
                            })
                })
    }
}