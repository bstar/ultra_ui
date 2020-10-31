import { remove, get } from 'lodash';

import {
    GET_LISTS_SUCCESS,
    GET_LISTS_BY_KEY_SUCCESS,
    GET_LIST_SUCCESS,
    DELETE_LIST_SUCCESS,
    INVALIDATE_LISTS,
  } from '../constants/ActionTypes';
  
  const initialSettings = {};
  
  const lists = (state = initialSettings, action) => {
    
    switch (action.type) {
  
      // TODO Might want this for admin views
      case GET_LISTS_SUCCESS:
    
        const lists = action.payload;

        console.log("REDUCER", lists)
  
        return {
          ...state,
          lists,
        };

      case GET_LISTS_BY_KEY_SUCCESS:
  
        const data = action.payload;

        return {
          ...state,
          [data.key]: data.lists,
        }

      case GET_LIST_SUCCESS:
  
        const activeList = action.payload;
  
        return {
          ...state,
          activeList: { id: activeList.id, key: activeList.key },
        };
      
      case INVALIDATE_LISTS:
        return null;

      default:
        return state;
    }
  };
  
  export default lists;
