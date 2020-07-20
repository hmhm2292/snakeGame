import React, {PureComponent} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export class StartResetButton extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {onPress, text} = this.props;

    return (
      <TouchableOpacity
        {...this.props}
        onPress={onPress}
        style={styles.startResetButtonContainer}>
        <Text style={styles.startResetButton}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default StartResetButton;

const styles = StyleSheet.create({
  startResetButton: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
  },
  startResetButtonContainer: {
    backgroundColor: 'teal',
    paddingVertical: 10,
    width: 100,
    alignSelf: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
