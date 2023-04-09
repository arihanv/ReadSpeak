import wordReducer from './word';
import {combineReducers} from 'redux';
import detectReducer from './detected';
import statsReducer from './stats';


const allReducers = combineReducers({
    word: wordReducer,
    detected: detectReducer,
    stats: statsReducer,
});

export default allReducers;