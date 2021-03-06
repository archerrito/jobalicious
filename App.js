import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

//Create redux store, create provider tag from redux library
//render provider tag, passing as props, child component of provider tag has access via prop
export default class App extends React.Component {
  
  componentDidMount() {
    registerForNotifications();
    //passed arrow function, called with notification
    //contains all info need ot know about notification
    Notifications.addListener((notification) => {
      
      const { data: { text }, origin } = notification;
      //same as
      //const text = notification.data.text;
      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      //route, display this screen
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: {screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            }),
            navigationOptions: {
              title: 'Review Jobs',
              tabBarIcon: ({ tintColor }) => {
                  return <Icon name="favorite" size={30} color={tintColor}/>
              },
            }
          }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      }, 
      //prevents loading of all screens on initial load
      lazy: true
    });
    return (
      <Provider store={store}>
        <MainNavigator />
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
