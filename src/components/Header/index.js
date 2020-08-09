import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Header = ({score}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.score}>SCORE: {score}</Text>
      <TouchableOpacity>
        <Text style={styles.score}>Score Board</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  score: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
