import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to Jobalicious', color: '#03A9F4' },
    { text: 'Use this to get a job', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
    onSlidesComplete = () => {
        //will auto send down props
        this.props.navigation.navigate('auth');
    }
    render() {
        return (
            //callback, bind
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
        );
    }
}

export default WelcomeScreen;