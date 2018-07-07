import MenuActions from "../Actions/MenuActions";

const INITIAL_STATE = {
    menuArray: [],
    errorText: "",
    isLoading: false,
    isError: false
};
export default function MenuReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MenuActions.LOAD_MENU:
        return Object.assign({}, state, {isLoading: true})

    case MenuActions.LOAD_MENU_DONE: 
        return Object.assign({}, state, {menuArray: action.payload, isLoading: false});
    
    case MenuActions.LOAD_MENU_ERROR:
        return Object.assign({}, state, {errorText: action.payload, isError: true,isLoading: false});
    default:
    return state;
  }
}
