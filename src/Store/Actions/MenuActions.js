export default class MenuActions{
    static LOAD_MENU = "LOAD_MENU";
    static LOAD_MENU_DONE = "LOAD_MENU_DONE";
    static LOAD_MENU_ERROR = "LOAD_MENU_EORROR";

    static loadMenu(user){
        return{
            type: MenuActions.LOAD_MENU,
            payload: user,
        }
    }

    static getMenuDataErr(err){
        return{
            type: MenuActions.LOAD_MENU_ERROR,
            payload: err
        }
    }
}