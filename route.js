import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import NewPage from './newPage';
import App from './App';
import Home from './home';
import ElementsPage from './elements';
import ModalPage from './modalPage';

export const FeedStack = DrawerNavigator({
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