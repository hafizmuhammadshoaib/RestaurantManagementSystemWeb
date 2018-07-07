import TableActions from "../Actions/TableActions";

const INITIAL_STATE = {
  tablesData: [],
  errorText: "",
  isLoading: false,
  isError: false
};
export default function TableReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TableActions.LOAD_TABLES:
        return Object.assign({}, state, {isLoading: true})

    case TableActions.LOAD_TABLES_DONE: 
        return Object.assign({}, state, {tablesData: action.payload, isLoading: false});
    
    case TableActions.LOAD_TABLES_ERROR:
        return Object.assign({}, state, {errorText: action.payload, isError: true,isLoading: false});
    default:
    return state;
  }
}
