import {
    FETCH_JOBS
} from '../actions/types';

const INITIAL_STATE = {
    //array of jobs we are dealing with
    results: []
};

//storing jobs in reducer
export default function(state= INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_JOBS:
        //replace jobs that user is reviewing each time
        return action.payload;
    default:
        return state;
    }
}