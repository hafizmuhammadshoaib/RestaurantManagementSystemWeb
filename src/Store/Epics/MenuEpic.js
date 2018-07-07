import AuthActions from "../Actions/AuthActions";
import MenuActions from "../Actions/MenuActions";
import { Observable } from "rxjs";
import {getMenuData}from '../Firebase/firebaseDB';
import { retry } from "rxjs/operator/retry";


export class MenuEpic{
    static getMenuDataReq(action$){
        return action$.ofType(MenuActions.LOAD_MENU)
                .switchMap(({payload})=>{
                    return Observable.fromPromise(getMenuData(payload))
                            .map((obj)=>{
                                console.log("Menu data fetched: " , obj);
                                return{
                                    type: MenuActions.LOAD_MENU_DONE,
                                    payload: obj
                                }
                            }).catch((error)=>{
                                return Observable.of(MenuActions.getMenuDataErr(error.message))
                            })
                })
    }
}