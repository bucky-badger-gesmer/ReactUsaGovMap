import colorReducer from './reducers/colorReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    colorReducer
});

export default allReducers;
