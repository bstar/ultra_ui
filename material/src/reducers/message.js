import {
    LOAD_MESSAGE_SUCCESS,
    CLOSE_MESSAGE_SUCCESS,
} from '../constants/ActionTypes';
  
const initialSettings = {};

const messages = (state = initialSettings, action) => {

    switch (action.type) {

        case LOAD_MESSAGE_SUCCESS:
        
            const data = action.payload;

            return {
                ...state,
                data,
            }

        case CLOSE_MESSAGE_SUCCESS:
    
            return {
                ...state,
                data: { 
                    open: false,
                },
            }

        default:
            return state;
    }
};
  
export default messages;
