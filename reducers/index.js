import { combineReducers } from 'redux';
import auth from './auth_reducer';

export default combineReducers({
    //gives us application level state called auth, has property called token
    auth
});