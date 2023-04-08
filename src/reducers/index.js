import wordReducer from './word';
import {combineReducers} from 'redux';
import detectReducer from './detected';


const allReducers = combineReducers({
    word: wordReducer,
    detected: detectReducer,
});

export default allReducers;