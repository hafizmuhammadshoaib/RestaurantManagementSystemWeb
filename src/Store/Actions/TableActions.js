export default class TableActions{
    static LOAD_TABLES = "LOAD_TABLES";
    
    static LOAD_TABLES_DONE = "LOAD_TABLES_DONE";

    static LOAD_TABLES_ERROR = "LOAD_TABLES_ERROR";
    
    static loadTables(user){
        return{
          type: TableActions.LOAD_TABLES,
          payload: user
        }
    }
    static getTablesDataErr(err){
        return{
            type: TableActions.LOAD_TABLES_ERROR,
            payload: err
        }
    }

}

