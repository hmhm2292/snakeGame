import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({score}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.score}>SCORE: {score}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  score: {
    marginVertical: 10,
    marginHorizontal: 20,
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
