import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import {
  Platform,
  StyleSheet,
  Text,
  View, BackHandler, ToastAndroid
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    }
  ];

class NewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [this.props.navigation.state.params.state.name, this.props.navigation.state.params.state.address, this.props.navigation.state.params.state.phone]
        }
        console.log(this.props);
        console.log(this.state.list);
        this.route = this.route.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    route () {
        this.props.navigation.navigate('Home', {state: this.state})
    }

    render() {
      return (<View style={
          {
              display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }
      }>
      <List containerStyle={{marginBottom: 20, width: '100%'}}>
        {
            this.state.list.map((l, i) => (
            <ListItem
                key={i}
                title={i, l}
            />
            ))
        }
        </List>
        <Button
        containerViewStyle={{width: 150}}
        raised
        backgroundColor="#397af8"
        icon={{name: 'fingerprint'}}
        title='HOME'
        onPress={this.route} />
      </View>);
    }
  }

export default NewPage;