import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const SpeedSelector = ({disabled, increment, decrement, speed}) => {
  return (
    <View style={styles.speedSelectorContainer}>
      <Text style={styles.speedTitle}>Speed</Text>
      <View style={styles.speedSelectorButton}>
        <TouchableOpacity
          disabled={disabled}
          onPress={increment}
          style={styles.plusMinusButton}>
          <Text style={styles.plusMinusSign}>+</Text>
        </TouchableOpacity>
        <Text style={styles.speedValue}>{speed}</Text>
        <TouchableOpacity
          disabled={disabled}
          onPress={decrement}
          style={styles.plusMinusButton}>
          <Text style={styles.plusMinusSign}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpeedSelector;

const styles = StyleSheet.create({
  speedSelectorContainer: {
    marginTop: 10,
  },
  speedTitle: {
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  speedSelectorButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  speedValue: {
    flex: 2,
    textAlign: 'center',
  },
  plusMinusButton: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 15,
    justifyContent: 'center',
  },
  plusMinusSign: {
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
  },
});
