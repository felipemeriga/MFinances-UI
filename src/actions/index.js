
import * as apiAction from './api';
import * as planningActions from  './planning';


const actions = {
    ...apiAction,
    ...planningActions
};

export { actions };
