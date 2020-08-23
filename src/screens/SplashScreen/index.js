import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {initializeApp} from '../../redux/reducers/appState';
import reactotron from 'reactotron-react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

class SplashScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
    this.progressBar = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.initializeApp();
    this.startLoading();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.progress !== this.state.progress) {
      this.startProgressBar();
    }
  }

  componentWillUnmount() {
    clearInterval(this.tick);
  }

  startProgressBar = () => {
    Animated.timing(this.progressBar, {
      toValue: this.state.progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  startLoading = () => {
    this.tick = setInterval(() => {
      this.setState(prevState => {
        if (prevState.progress < 100) {
          return {progress: prevState.progress + 5};
        } else {
          clearInterval(this.tick);
          return setTimeout(() => {
            this.navigateToMainScreen();
          }, 300);
        }
      });
    }, 100);
  };

  navigateToMainScreen = () => {
    this.props.navigation.navigate('MainScreen');
  };

  renderProgressBar = () => {
    const widthInterpolated = this.progressBar.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={
          ([StyleSheet.absoluteFill],
          {
            backgroundColor: 'teal',
            width: widthInterpolated,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          })
        }
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View />
        <Text> Splash </Text>

        <View style={styles.progressBarContainer}>
          <Text>Loading.....</Text>
          <View style={styles.progressBar}>{this.renderProgressBar()}</View>
          <Text>{this.state.progress}%</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

  progressBarContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
});

const mapStateToProps = state => ({
  appState: state.appState.appState,
  stateParams: state.appState.params,
});

const mapDispatchToProps = dispatch => ({
  initializeApp: () => dispatch(initializeApp()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
