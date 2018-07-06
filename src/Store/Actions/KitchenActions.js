export default class KitchenActions {
    static GET_ORDERS_PROGRESS = 'GET_ORDERS_PROGRESS';
    static GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
    static GET_ORDERS_ERROR = 'GET_ORDERS_ERROR';

    static getOrders(user) {
        return {
            type: KitchenActions.GET_ORDERS_PROGRESS,
            payload: user
        }
    }
    static orderError(msg) {
        return {
            type:KitchenActions.GET_ORDERS_ERROR,
            payload: msg
        }
    }
}