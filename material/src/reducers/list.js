import {
    GET_LISTS_SUCCESS,
    GET_LISTS_BY_TYPE_SUCCESS,
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
        };

      case GET_LISTS_BY_TYPE_SUCCESS:
  
        const data = action.payload;

        console.log("DATA", data)
        return {
          ...state,
          [data.type]: data.lists,
        }

      case GET_LIST_SUCCESS:
  
        const activeList = action.payload;
  
        return {
          ...state,
          activeList: activeList.id,
        };

      case INVALIDATE_LISTS:
        return {
          ...state,
          list: null,
        };

      default:
        return state;
    }
  };
  
  export default lists;
