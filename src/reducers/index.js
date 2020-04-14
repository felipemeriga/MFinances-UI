import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import books from "./books";
import plannings from './plannings';

const bookState = combineReducers({
    routing: routerReducer,
    books,
    plannings
});

export default bookState;



