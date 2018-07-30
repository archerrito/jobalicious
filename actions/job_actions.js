import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import fakeData from './fakeData';

import {
    FETCH_JOBS,
    LIKE_JOB
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
// export const fetchJobs = (region) => async (dispatch) => {
//     try {
//         //contains lat/lng
//         let zip = await reverseGeocode(region);
//         const url = buildJobsUrl(zip);
//         //will make request, return response object
//         let { data } = await axios.get(url);
//         console.log(data);
//         dispatch({ type: FETCH_JOBS, payload: data });
//         console.log(region);
//     } catch(e) {
//         console.error(e);
//     }
// };

//Sample data
export const fetchJobs = (region, callback) => async dispatch => {
    try {
    let zip = await reverseGeocode(region)
    const url = buildJobsUrl(zip)
    let { data } = await axios.get(url)
    console.log(data)
    dispatch({ type: FETCH_JOBS, payload: fakeData(region) })
    console.log(region);
    callback();
    } catch (err) {
    console.error(err)
    }
   }

   export const likeJob = (job) => {
       return {
           payload: job, 
           type: LIKE_JOB
       }
   }