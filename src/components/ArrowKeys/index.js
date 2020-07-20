import React, {PureComponent} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import arrowButton from '../../assets/btnChatsend.png';

const screenWidth = Math.round(Dimensions.get('window').width);

class ArrowKeys extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {snake, direction, onPressArrowKey} = this.props;
    return (
      <View style={styles.arrowContainer}>
        <TouchableOpacity
          hitSlop={{top: 10}}
          disabled={
            snake.tail.length > 0 && direction === 'down' ? true : false
          }
          onPress={() => {
            onPressArrowKey('up');
          }}>
          <Image style={styles.topArrow} source={arrowButton} />
        </TouchableOpacity>
        <View style={styles.leftRightContainer}>
          <TouchableOpacity
            disabled={
              snake.tail.length > 0 && direction === 'right' ? true : false
            }
            onPress={() => {
              onPressArrowKey('left');
            }}
            hitSlop={{right: -10, left: 15, top: -3, bottom: -3}}>
            <Image style={styles.leftArrow} source={arrowButton} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={
              snake.tail.length > 0 && direction === 'left' ? true : false
            }
            onPress={() => {
              onPressArrowKey('right');
            }}
            hitSlop={{left: -10, right: 15, top: -3, bottom: -3}}>
            <Image style={styles.rightArrow} source={arrowButton} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          hitSlop={{bottom: 10}}
          disabled={snake.tail.length > 0 && direction === 'up' ? true : false}
          onPress={() => {
            onPressArrowKey('down');
          }}>
          <Image style={styles.bottomArrow} source={arrowButton} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ArrowKeys;

const styles = StyleSheet.create({
  arrowContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  leftRightContainer: {
    flexDirection: 'row',
    marginVertical: -5,
  },
  topArrow: {
    width: 60,
    height: 60,
  },
  leftArrow: {
    width: 60,
    height: 60,
    marginRight: 20,
    transform: [{rotate: '270deg'}],
  },
  rightArrow: {
    width: 60,
    height: 60,
    marginLeft: 20,
    transform: [{rotate: '90deg'}],
  },
  bottomArrow: {
    width: 60,
    height: 60,
    transform: [{rotate: '180deg'}],
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
