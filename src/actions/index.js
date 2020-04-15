import * as planningActions from './plannings';
import * as booksAction from './books';
import * as apiAction from './api';


const actions = {
    ...planningActions,
    ...booksAction,
    ...apiAction

};

export { actions };
