import React, { Component } from 'react';
import { List, ListItem, SearchBar, Card } from 'react-native-elements';
import {
  Platform,
  StyleSheet,
  Text,
  View, BackHandler, ToastAndroid, Modal, DatePickerAndroid, DatePickerIOS
} from 'react-native';
// import Modal from 'react-native-modal'
import { FormLabel, FormInput, FormValidationMessage, Button, CheckBox } from 'react-native-elements';
import ModalPage from './modalPage';
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

class ElementsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [this.props.navigation.state.params.state.name, this.props.navigation.state.params.state.address, this.props.navigation.state.params.state.phone],
            checked: false,
            showModal: false,
            modalDetails: {},
            selectedValue:0,
            timeZoneOffsetInHours: 0,
            date: 'mm-dd-yyyy',
            showiosDatePicker: false
        }
        console.log(this.props);
        console.log(this.state);
        this.route = this.route.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showAndroidDatePicker = this.showAndroidDatePicker.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    openDatePicker () {
        if (Platform.OS === 'android') {
            this.showAndroidDatePicker();
        } else {
            this.setState({showiosDatePicker: true});
            console.log('ios');
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    route () {
        this.props.navigation.navigate('Home', {state: this.state})
    }

    handleCheckbox () {
        this.setState({checked: !this.state.checked})
    }

    openModal (details) {
        console.log(details);
        this.setState({modalDetails: details, showModal: true});
        // this.props.navigation.navigate('ModalPage', {state: details})
        //     return (
        //       <View>
        //         <Modal isVisible={true}>
        //         <View style={{ flex: 1 }}>
        //             <Text>I am the modal content!</Text>
        //         </View>
        //         </Modal>
        //     </View>
        //     )
    }

    closeModal () {
        this.setState({showModal: false});
    }

    showAndroidDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.selectedValue
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day);
                this.setState({date: date.toLocaleDateString()});
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    };

    render() {
      return (<View style={
          {
              display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }
      }>
      <ModalPage isVisible={this.state.showModal} updateParent={this.closeModal} details={this.state.modalDetails}></ModalPage>
      <List containerStyle={{marginBottom: 20, width: '100%'}}>
        {
            list.map((l, i) => (
            <ListItem
                roundAvatar
                avatar={{uri:l.avatar_url}}
                key={i}
                title={l.name}
                onPress={() => this.openModal(l)}
            />
            ))
        }
        </List>
        <CheckBox
        onPress={this.handleCheckbox}
        title='Click Here'
        checked={this.state.checked}
        />

        <CheckBox
        onPress={this.handleCheckbox}
        center
        title='Click Here'
        checked={this.state.checked}
        />

        <CheckBox
        onPress={this.handleCheckbox}
        center
        title='Click Here'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={this.state.checked}
        />

        <CheckBox
        onPress={this.handleCheckbox}
        center
        title='Click Here to Remove This Item'
        iconRight
        iconType='material'
        checkedIcon='clear'
        uncheckedIcon='add'
        checkedColor='red'
        checked={this.state.checked}
        />
        <SearchBar
        containerStyle={{width: '90%'}}
        placeholder='Type Here...' />

        <Button
        containerViewStyle={{width: 150}}
        raised
        backgroundColor="#397af8"
        icon={{name: 'fingerprint'}}
        title='HOME'
        onPress={this.route} />

        <View style={{paddingTop: 5}}>
            <Button
                containerViewStyle={{width: 150}}
                raised
                backgroundColor="#397af8"
                icon={{name: 'fingerprint'}}
                title='DATE PICKER'
                onPress={this.openDatePicker} />
            <Text>
                Selected Date: {this.state.date}
            </Text>
        </View>

        <View>
        {Platform.OS === 'ios' ?
            <DatePickerIOS date={this.state.selectedValue} mode="date" timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60} onDateChange={(date) => {
                this.setState({date: date, showiosDatePicker: false });
                }} /> :
            null
        }
        </View>
      </View>);
    }
  }

export default ElementsPage;

{/* <Modal visible={this.state.showModal} onRequestClose={this.closeModal} animationType='slide' presentationStyle='pageSheet'>

                <Text>I am the modal content!</Text>

            </Modal> */}

{/* <SearchBar
        containerStyle={{width: '90%'}}
        noIcon
        placeholder='Type Here...' />

        <SearchBar
        containerStyle={{width: '90%'}}
        round
        placeholder='Type Here...' />

        <SearchBar
        containerStyle={{width: '90%'}}
        lightTheme
        placeholder='Type Here...' /> */}