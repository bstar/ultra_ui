import {
    GET_LISTS_SUCCESS,
    GET_LIST_SUCCESS,
    INVALIDATE_LISTS,
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

      case INVALIDATE_LISTS:
        return {
          ...state,
          list: null,
        } 

      default:
        return state;
    }
  };
  
  export default lists;
