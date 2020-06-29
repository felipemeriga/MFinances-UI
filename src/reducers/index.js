import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import planningTable from './planningTable';
import categoryTable from "./categoryTable";
import cashFlowTable from "./cashFlowTable";
import headerStatistics from "./headerStatistics";
import expenseStatistics from "./expenseStatistics";
import averageExpenses from "./averageExpenses";
import session from "./session";

const bookState = combineReducers({
    routing: routerReducer,
    planningTable: planningTable,
    categoryTable: categoryTable,
    cashFlowTable: cashFlowTable,
    headerStatistics: headerStatistics,
    expenseStatistics: expenseStatistics,
    averageExpenses: averageExpenses,
    session: session
});

export default bookState;



