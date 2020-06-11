import {
    OPEN_MODAL_SUCCESS,
    CLOSE_MODAL_SUCCESS,
} from '../constants/ActionTypes';
  
const initialSettings = {};

const modal = (state = initialSettings, action) => {

    switch (action.type) {

        case OPEN_MODAL_SUCCESS:

            return {
                ...state,
                [action.payload.id]: true,
            }

        case CLOSE_MODAL_SUCCESS:

            return {
                ...state,
                [action.payload.id]: false,
            }

        default:
            return state;
    }
};
  
export default modal;
