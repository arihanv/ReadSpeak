import { initialState } from './initial';

const wordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':

      //remove all punctuation only at the end of the action.payload
      action.payload = action.payload.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

      if(Array.isArray(state.words) && action.payload.length > 0 && !state.words.includes(action.payload)){
        return { ...state, words: [...state.words, action.payload] };
      }
      else if (Array.isArray(state.words)) {
        return { ...state, words: [...state.words] };
      } else {
        return { ...state, words: action.payload };
      }
    case 'DECREMENT':
    return {
        ...state,
        words: state.words.filter(word => word !== action.payload)
    };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
};

export default wordReducer;
