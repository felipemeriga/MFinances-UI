import * as types from "./types";


export function validateCategoryAlreadyExistsInMonth(payload) {
    return {
        type: types.PLANNING_TABLE['VALIDATE_CATEGORY_ALREADY_EXISTS_IN_MONTH'],
        payload: payload
    };
}
