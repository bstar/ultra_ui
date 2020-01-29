import {
    GET_ATTRIBUTES_SUCCESS,
  } from '../constants/ActionTypes';
  
  const initialSettings = {};
  
  const attributes = (state = initialSettings, action) => {
    
    switch (action.type) {
  
      case GET_ATTRIBUTES_SUCCESS:
    
        const attributes = action.payload;
  
        return {
          ...state,
          [attributes[0].boidId]: attributes,
        }
  
      default:
        return state;
    }
  };
  
  export default attributes;
  