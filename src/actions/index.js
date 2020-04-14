import * as planningActions from './plannings';
import * as booksAction from './books';


const actions = {
    ...planningActions,
    ...booksAction
};

export { actions };
