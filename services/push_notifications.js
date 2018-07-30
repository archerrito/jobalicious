import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'redux-persist/storages';
import axios from 'axios'

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'

export default async () => {
    let previousToken = await AsyncStorage.getItem('pushtoken');
    console.log(previousToken);

    if (previousToken) {
        return;
    } else {
        //ask for permission
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (status !== 'granted') {
            //anything but granted, try again in the future
            return;
        }

        //generates token to identify this particular device
        let token = await Notifications.getExpoPushTokenAsync();
        //save token to server
        axios.post(PUSH_ENDPOINT, {token: { token }});
        //then save to local storage
        AsyncStorage.setItem('pushtoken', token);
    }
}