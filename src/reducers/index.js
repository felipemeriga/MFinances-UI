import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import books from "./books";
import auth from "./auth";

const bookState = combineReducers({
    routing: routerReducer,
    books,
    auth
});

export default bookState;



