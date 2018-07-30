import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
    FETCH_JOBS
} from './types';

const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

//will make network request with thunk
//pass in region object to get list of jobs
export const fetchJobs = (region) => async (dispatch) =>{
    try {
        //contains lat/lng
        let zip = await reverseGeocode(region);
    } catch(e) {
        console.error(e);
    }
};