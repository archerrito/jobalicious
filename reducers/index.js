import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';

export default combineReducers({
    //gives us application level state called auth, has property called token
    //list of jobs lives on jobs piece of state
    auth, jobs
});