import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Header extends Component<{}> {
  render() {
    return (
      <View style={styles.header}>
            <TouchableOpacity onPress={this.props.onToggleAllComplete}>
                <Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
            </TouchableOpacity>
        <TextInput
            value={this.props.value}
            onChangeText={this.props.onChange}
            onSubmitEditing={this.props.onAddItem}
            placeholder="What needs to be done?"
            blurOnSubmit= {false}
            returnKeyType="done"
            style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    marginLeft: 16
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
  },
  toggleIcon: {
      fontSize: 30,
      color: "#CCC"
  }
});
