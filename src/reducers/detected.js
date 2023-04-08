import { initialState } from './initial';

const detectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETECT':
    return action.payload;

    default:
      return state;
  }
};

export default detectReducer;