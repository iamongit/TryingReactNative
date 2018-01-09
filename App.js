import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  Keyboard
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Header from './header';
import Footer from './footer';
import Row from './row';
// import FeedStack from './route';
import NewPage from './newPage';
import Home from './home';
import ElementsPage from './elements';
import ModalPage from './modalPage';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const FeedStack = DrawerNavigator({
  Home: { screen: Home, backBehavior: 'none'  },
  NewP: {
    screen: NewPage,
    navigationOptions: {
      title: 'New Page Title',
      backBehavior: 'none'
    },
  },
  Elements: {
    screen: ElementsPage,
    navigationOptions: {
      title: 'Elements Page Title',
      backBehavior: 'none'
    },
  },
  ModalPage: {
    screen: ModalPage,
    navigationOptions: {
      title: 'Modal Page Title'
    },
  }
});

const AppNavigation = () => (
  <FeedStack  />
);

export default class App extends React.Component {
  render() {
    return (
        <AppNavigation/>
    );
  }
}