import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
// import { Modal} from 'react-native-modal';
import {
  Platform,
  StyleSheet,
  Text,
  View, BackHandler, ToastAndroid, Modal
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Avatar } from 'react-native-elements';
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

class ModalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.isVisible
        }
        console.log(this.props, 'MODAL PAGE Props');
        // console.log(this.props.navigation.state.params.state, 'MODAL PAGE');
        this.route = this.route.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, this.props, this.state);
        if (nextProps.isVisible && !this.props.isVisible) {
          this.setState({ isVisible: nextProps.isVisible})
          this.props.updateParent()
        }
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

    closeModal () {
        this.setState({isVisible: false});
    }

    render() {
        return (
        <Modal visible={this.state.isVisible} onRequestClose={this.closeModal} animationType='slide' presentationStyle='pageSheet'>
            <View style={
                {
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#00000080',
                }
            }>
            <View style={
                {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '30%',
                    width: 300,
                    height: 300,
                    backgroundColor: '#fff',
                    padding: 20,
                }
            }>
                <Avatar
                xlarge
                rounded
                source={{uri: this.props.details.avatar_url}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                />
                <Text>{this.props.details.name}</Text>
            </View>
            </View>
        </Modal>
        )
    }
  }

export default ModalPage;