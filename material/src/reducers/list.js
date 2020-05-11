import {
    GET_LISTS_SUCCESS,
    GET_LIST_SUCCESS,
  } from '../constants/ActionTypes';
  
  const initialSettings = {};
  
  const lists = (state = initialSettings, action) => {
    
    switch (action.type) {
  
      case GET_LISTS_SUCCESS:
    
        const lists = action.payload;
  
        return {
          ...state,
          lists,
        }

      case GET_LIST_SUCCESS:
  
        const activeList = action.payload;
  
        return {
          ...state,
          activeList,
        }
  
      default:
        return state;
    }
  };
  
  export default lists;
