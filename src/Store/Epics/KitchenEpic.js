import { Observable } from "rxjs";
import KitchenActions from "../Actions/KitchenActions";
import { getOrders } from '../Firebase/firebaseDB';


export class KitchenEpic{
    static getKitchenOrdersFromFirebase(action$) {
        return action$.ofType(KitchenActions.GET_ORDERS_PROGRESS).switchMap(({ payload }) => {
            return Observable.fromPromise(getOrders(payload)).map((array) => {
                return {
                    type:KitchenActions.GET_ORDERS_SUCCESS,
                    payload:array
                }
            }).catch((err)=>{
                return Observable.of(KitchenActions.orderError(err.message))
            })
        })
    }
}