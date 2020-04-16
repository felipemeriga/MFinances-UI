import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import plannings from './plannings';
import categories from "./categories";

const bookState = combineReducers({
    routing: routerReducer,
    plannings,
    categories
});

export default bookState;



