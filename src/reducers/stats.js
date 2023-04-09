import { initialState } from './initial';

const statsReducer = (state = initialState.stats, action) => {
  switch (action.type) {
    case 'READ':
      const newStats = {
        ...state,
        total: state.total + 1,
      };
      return newStats;

    case 'CARD':
      return {
        ...state,
        cardTotal: state.cardTotal + 1,
      };

    case 'RESET_STATS':
      return {
        ...state,
        total: 0,
        cardTotal: 0,
        date: new Date().toLocaleDateString('en-GB'),
      };

    default:
      return state;
  }
};

export default statsReducer;
