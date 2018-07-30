import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
    FETCH_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const buildJobsUrl = (zip) => {
    //pass in object, pass in zip object
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip});
    //took root, then appended query params
    return `${JOB_ROOT_URL}${query}`;
}

//will make network request with thunk
//pass in region object to get list of jobs
export const fetchJobs = (region) => async (dispatch) =>{
    try {
        //contains lat/lng
        let zip = await reverseGeocode(region);
        const url = buildJobsUrl(zip);
        //qill make request, return response object
        let { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
        console.log(data);
    } catch(e) {
        console.error(e);
    }
};