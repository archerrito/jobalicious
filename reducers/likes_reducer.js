import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/es/constants';
import {
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from '../actions/types';
import { clearLikedJobs } from '../actions/job_actions';

export default function (state = [], action) {
    switch (action.type) {
        case REHYDRATE:
            return action.payload.likedJobs || [];
        case CLEAR_LIKED_JOBS:
            return [];
        case LIKE_JOB:
            //pass in list of jobs, compare to key to check unique
            return _.uniqBy([
                //jobs users liked, and ever liked before
                action.payload, ...state
            ], 'jobkey')
    default:
        return state;
    }
}