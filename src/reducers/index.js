import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import planningTable from './planningTable';
import categoryTable from "./categoryTable";

const bookState = combineReducers({
    routing: routerReducer,
    planningTable: planningTable,
    categoryTable: categoryTable
});

export default bookState;



