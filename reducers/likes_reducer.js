import _ from 'lodash';

import {
    LIKE_JOB
} from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
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