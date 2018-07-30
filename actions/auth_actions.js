import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';



//action creator if token exists
export const facebookLogin = () => async dispatch => {
    //stored in asyncstorage
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        //Dispatch action saying FBlogin is done
        //redux store 
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        //start up FB login process, helper function
        doFacebookLogin(dispatch);

    }
};

const doFacebookLogin = async dispatch => {
    //result will have type and token property
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('249027059249502', {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL})
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};