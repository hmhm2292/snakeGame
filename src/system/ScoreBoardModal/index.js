import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import closeButton from '../../assets/icClosed14700.png';

class ScoreBoardModal extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    noBackdropPress: PropTypes.bool,
  };

  renderScoreList = () => {
    const playerList = this.props.scoreBoard.map((item, index) => {
      return (
        <View key={index}>
          <Text style={styles.list}>{item.player}</Text>
        </View>
      );
    });

    const scoreList = this.props.scoreBoard.map((item, index) => {
      return (
        <View key={index}>
          <Text style={styles.list}>{item.score}</Text>
        </View>
      );
    });

    return (
      <View style={styles.container2}>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Player</Text>
          {playerList}
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Score</Text>
          {scoreList}
        </View>
      </View>
    );
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Modal
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        onBackdropPress={this.onClose}
        style={styles.container}
        isVisible={this.props.isVisible}>
        <View style={styles.modal}>
          <View style={styles.close}>
            <TouchableOpacity onPress={this.onClose}>
              <Image source={closeButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Top 10 Players</Text>
          </View>

          {this.renderScoreList()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center'},
  container2: {justifyContent: 'center', flexDirection: 'row'},
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
  },
  titleContainer: {
    borderBottomColor: 'gray',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  close: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 100,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    fontSize: 15,
    marginVertical: 3,
  },
  listContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

const mapStateToProps = state => ({
  appState: state.appState.appState,
  scoreBoard: state.scoreBoard.scoreBoard,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreBoardModal);

ScoreBoardModal.defaultProps = {
  noBackdropPress: false,
};
