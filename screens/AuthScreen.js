import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    //called when component about to re-render
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }
    render() {
        return (
            <View />
        )
    }
}

//wire up auth screen to auth piece of state in app
//so auth screen knows current state of authentication is
//look at token property
function mapStateToProps({ auth }){
    return { token: auth.token };
}

//take actions, bind ot authscreen
export default connect(mapStateToProps, actions)(AuthScreen);