import jwt_decode from 'jwt-decode';

import {
    GET_JWT_SUCCESS, INVALIDATE_JWT_USER,
} from '../constants/ActionTypes';
  
const initialSettings = {};

const user = (state = initialSettings, action) => {

    switch (action.type) {

        case GET_JWT_SUCCESS:
        
            const user = action.payload;

            console.log("USER", user)

            return {
                ...state,
                data: user,
                jwt: jwt_decode(user.token),
            }

        case INVALIDATE_JWT_USER:
    
            return {
                ...state,
                data: null,
                jwt: null,
            }        

        default:
            return state;
    }
};
  
export default user;
