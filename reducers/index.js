import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';

export default combineReducers({
    //gives us application level state called auth, has property called token
    //list of jobs lives on jobs piece of state
    //likst of uniquely lkiked jobs
    auth, jobs, likedJobs
});