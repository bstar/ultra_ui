import {
  GET_PLAYER_SUCCESS,
  GET_PLAYERS_SUCCESS,
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

      case GET_PLAYERS_SUCCESS:
  
        const players = action.payload;
  
        return {
          ...state,
          search: players,
        }

    default:
      return state;
  }
};

export default player;
