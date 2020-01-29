import {
  GET_PLAYER_SUCCESS,
} from '../constants/ActionTypes';

const initialSettings = {};

const player = (state = initialSettings, action) => {
  
  switch (action.type) {

    case GET_PLAYER_SUCCESS:
  
      const player = action.payload;

      return {
        ...state,
        [player.id]: player,
      }

    default:
      return state;
  }
};

export default player;
