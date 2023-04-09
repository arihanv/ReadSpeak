import { initialState } from './initial';

const statsReducer = (state = initialState.stats, action) => {
  switch (action.type) {
    case 'READ':
      const newStats = {
        ...state,
        total: state.total + 1,
      };
      console.log(newStats.total);
      return newStats;

    case 'RESET_STATS':
      return {
        ...state,
        total: 0,
        date: new Date().toLocaleDateString('en-GB'),
      };

    default:
      return state;
  }
};

export default statsReducer;
