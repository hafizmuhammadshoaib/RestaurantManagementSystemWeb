import KitchenActions from '../Actions/KitchenActions';
const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    orders: []
}
export default function KitchenReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case KitchenActions.GET_ORDERS_PROGRESS:
            return Object.assign({}, state, { isLoading: true });
        case KitchenActions.GET_ORDERS_SUCCESS:
            return Object.assign({}, state, { isLoading: false, orders: action.payload })
        case KitchenActions.GET_ORDERS_ERROR:
            return Object.assign({}, state, { isLoading: false, isError: true, errorMsg: action.payload })
        default:
            return state;
    }
}