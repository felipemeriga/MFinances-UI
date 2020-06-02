import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import planningTable from './planningTable';
import categoryTable from "./categoryTable";
import cashFlowTable from "./cashFlowTable";

const bookState = combineReducers({
    routing: routerReducer,
    planningTable: planningTable,
    categoryTable: categoryTable,
    cashFlowTable: cashFlowTable,
});

export default bookState;



