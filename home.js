import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  Keyboard,
  Dimensions
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, CheckBox } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import Header from './header';
import Footer from './footer';
import Row from './row';
// import FeedStack from './route';
import colors from './colors';
import normalize from './normalize';
import fonts from './fonts';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Home extends Component<{}> {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      allComplete: false,
      value: "",
      items: [],
      dataSource: ds.cloneWithRows([]),
      name: null,
      address: null,
      phone: null,
      touched: {
        name: false,
        address: false,
        phone: false
      },
      checked: false,
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.setSource = this.setSource.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.route = this.route.bind(this);
    this.routeElements = this.routeElements.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  setSource (items, itemsDataSource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    })
  }
  handleToggleAllComplete () {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete
    }))
    this.setSource(newItems, newItems, { allComplete: complete });
    console.table(newItems);
  }
  handleAddItem () {
    if(!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setSource(newItems, newItems, { value: "" });
  }
  handleForm () {
    console.table(this.state);
  }
  route () {
    console.log(this.props);
    this.props.navigation.navigate('NewP', {state: this.state})
  }
  routeElements () {
    console.log(this.props);
    this.props.navigation.navigate('Elements', {state: this.state})
  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  handleCheckbox () {
      this.setState({checked: !this.state.checked})
  }
  render() {
    return (
      <View style={styles.container}>
      <Text
        style={
          styles.label}
      >
        Name
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <FormLabel>Name</FormLabel>
      <FormInput onBlur={this.handleBlur('name')} onChangeText={(value) => this.setState({name: value})}/>
      { this.state.touched.name && !this.state.name && <FormValidationMessage>Name Required</FormValidationMessage> }
      <FormLabel>Address</FormLabel>
      <FormInput onBlur={this.handleBlur('address')} onChangeText={(value) => this.setState({address: value})}/>
      { this.state.touched.address && !this.state.address && <FormValidationMessage>Address Required</FormValidationMessage> }
      <FormLabel>Phone</FormLabel>
      <FormInput onBlur={this.handleBlur('phone')} keyboardType={'numeric'} onChangeText={(value) => this.setState({phone: value})}/>
      { this.state.touched.phone && !this.state.phone && <FormValidationMessage>Phone Required</FormValidationMessage> }
        <Button
        raised
        disabled={!this.state.name || !this.state.address || !this.state.phone}
        backgroundColor="#397af8"
        icon={{name: 'fingerprint'}}
        title='ROUTE'
        onPress={this.route} />
        <Button
        raised
        disabled={false}
        backgroundColor="#397af8"
        icon={{name: 'subway'}}
        title='SEE ELEMENTS'
        onPress={this.routeElements} />
      <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      android: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1,

  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: "#F5F5F5"
  },
  route: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: '#FFF'
  },
  label: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 1,
    color: colors.grey3,
    fontSize: normalize(12),
    ...Platform.select({
      ios: {
        fontWeight: 'bold',
      },
      android: {
        ...fonts.android.bold,
      },
    }),
  },
  input: {
    marginLeft: 15,
    marginRight: 15,
    ...Platform.select({
      android: {
        minHeight: 46,
        width: Dimensions.get('window').width - 30,
      },
      ios: {
        minHeight: 36,
        width: Dimensions.get('window').width - 30,
      },
    }),
    // breaks tests - fix before release
    // Invariant Violation: Invalid undefined `width` of type `string`
    // supplied to `StyleSheet input`, expected `number`.
    color: colors.grey3,
  },
});

export default Home;