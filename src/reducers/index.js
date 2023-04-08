import wordReducer from './word';
import {combineReducers} from 'redux';


const allReducers = combineReducers({
    word: wordReducer,
});

export default allReducers;