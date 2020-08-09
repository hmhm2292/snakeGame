import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';

import {initializeApp} from '../../redux/reducers/appState';

import ArrowKeys from '../../components/ArrowKeys';
import StartResetButton from '../../components/StartResetButton';
import SpeedSelector from '../../components/SpeedSelector';
import Header from '../../components/Header';
import Grid from '../../components/Grid';

import gameOver from '../../assets/hiclipart.com.png';
import snakeCover from '../../assets/snakeCover.png';

import reactotron from 'reactotron-react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const rows = 35;
const columns = 35;
class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      direction: 'right',
      rows: rows,
      columns: columns,
      grid: [],
      food: {row: 0, col: 0},
      snake: {
        head: {row: 0, col: 0},
        tail: [],
      },
      speed: 1,
      playing: false,
      gameOver: false,
      score: 0,
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.gameOver !== prevState.gameOver &&
      this.state.gameOver === true
    ) {
      console.log('gameOver');
      clearInterval(this.timerTick);
      this.updateGameState();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerTick);
  }

  makeRandomFood = () => {
    return {
      row: Math.floor(Math.random() * this.state.rows),
      col: Math.floor(Math.random() * this.state.columns),
    };
  };

  setSnakeHead = () => {
    // in the middle of the grid
    return {
      row: Math.floor((this.state.rows - 1) / 2),
      col: Math.floor((this.state.columns - 1) / 2),
    };
  };

  initializeGame = () => {
    if (this.timerTick) {
      //if interval exists
      clearInterval(this.timerTick);
      console.log('clearTimer');
    }
    //sets the state with all the intial state values
    this.setState(state => {
      const updatedState = {
        direction: 'right',
        rows: rows,
        columns: columns,
        grid: [],
        food: this.makeRandomFood(),
        snake: {
          head: this.setSnakeHead(),
          tail: [],
        },
        playing: false,
        gameOver: false,
        score: 0,
      };

      const grid = this.makeGrid();

      return {
        ...updatedState,
        grid: grid,
      };
    });
  };

  makeGrid = () => {
    const grid = [];
    for (let row = 0; row < this.state.rows; row++) {
      for (let col = 0; col < this.state.columns; col++) {
        grid.push({
          row,
          col,
        });
      }
    }
    return grid;
  };

  makeRandomFoodNotLandOnSnake = tail => {
    let isTrue = true;
    while (isTrue) {
      let food = this.makeRandomFood();
      if (!this.checkIfCollide(tail, food)) {
        isTrue = false;
        return food;
      }
    }
  };

  isEqual = (tail, foodOrHead) => {
    return tail.row === foodOrHead.row && tail.col === foodOrHead.col;
  };

  checkIfCollide = (tail, foodOrHead) => {
    let isCollide = tail
      .map(eachTail => {
        return this.isEqual(eachTail, foodOrHead);
      })
      .some(collide => collide === true);

    return isCollide;
  };

  checkIfHeadCollideWithWall = head => {
    if (
      head.row < 0 ||
      head.row >= this.state.rows ||
      head.col < 0 ||
      head.col >= this.state.rows
    ) {
      return true;
    } else {
      return false;
    }
  };

  updateGameState = () => {
    this.setState({playing: false});
  };

  updateSnake = () => {
    this.setState(state => {
      let {food, snake, direction} = state;
      let {tail, head} = snake;

      tail.unshift({
        row: head.row,
        col: head.col,
      });
      if (head.row === food.row && head.col === food.col) {
        food = this.makeRandomFoodNotLandOnSnake(tail);
        // console.log('byebye', this.makeRandomFoodNotLandOnSnake(tail));
      } else {
        tail.pop();
      }
      // if head meets food keep the tail else remove the tail that was just created

      switch (direction) {
        case 'right':
          head.col++;
          break;
        case 'left':
          head.col--;
          break;
        case 'up':
          head.row--;
          break;
        case 'down':
          head.row++;
          break;
      }

      let isDead = false;

      if (
        this.checkIfHeadCollideWithWall(head) ||
        this.checkIfCollide(tail, head)
      ) {
        isDead = true;
      }

      const updatedSnakeAndFood = {
        food,
        snake: {
          head,
          tail,
        },
      };

      const updatedScore = tail.length * 10;

      return {
        ...updatedSnakeAndFood,
        score: updatedScore,
        gameOver: isDead,
      };
    });
  };

  onPressStart = () => {
    let timer = 1100 - this.state.speed * 100;

    this.timerTick = setInterval(() => {
      this.updateSnake();
    }, timer);

    this.setState({playing: true}, () => {
      setTimeout(() => {
        this.timerTick;
      }, 200);
    });
  };

  onPressReset = () => {
    this.initializeGame();
  };

  onPressPlus = () => {
    if (this.state.speed < 10) {
      this.setState(prevState => {
        return {speed: prevState.speed + 1};
      });
    }
  };

  onPressMinus = () => {
    if (this.state.speed > 1) {
      this.setState(prevState => {
        return {speed: prevState.speed - 1};
      });
    }
  };

  onPressArrowKey = direction => {
    this.setState({direction: direction});
  };

  renderSnakeTail = () => {
    return this.state.snake.tail.map((tail, i) => {
      return (
        <View
          key={i}
          style={[
            styles.snake,
            {
              left: (screenWidth / columns) * tail.col,
              top: (screenWidth / rows) * tail.row,
            },
          ]}
        />
      );
    });
  };

  render() {
    return (
      <SafeAreaView>
        <Header score={this.state.score} />
        <View style={styles.container}>
          {this.state.gameOver ? (
            <Image
              source={gameOver}
              style={styles.gameOver}
              resizeMode={'contain'}
            />
          ) : (
            <>
              <View>
                <Grid gridColumns={this.state.columns} grid={this.state.grid} />

                {this.state.playing ? (
                  <>
                    <View
                      style={[
                        styles.foodItem,
                        {
                          left: (screenWidth / columns) * this.state.food.col,
                          top: (screenWidth / rows) * this.state.food.row,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.snake,
                        {
                          left:
                            (screenWidth / columns) * this.state.snake.head.col,
                          top: (screenWidth / rows) * this.state.snake.head.row,
                        },
                      ]}
                    />
                    {this.renderSnakeTail()}
                  </>
                ) : (
                  <Image source={snakeCover} style={styles.snakeCover} />
                )}
              </View>
            </>
          )}
        </View>

        <ArrowKeys
          onPressArrowKey={this.onPressArrowKey}
          snake={this.state.snake}
          direction={this.state.direction}
        />

        <View style={styles.buttons}>
          <StartResetButton
            text={'START!'}
            onPress={this.onPressStart}
            disabled={this.state.playing}
          />

          <StartResetButton text={'RESET!'} onPress={this.onPressReset} />
        </View>

        <SpeedSelector
          speed={this.state.speed}
          increment={this.onPressPlus}
          decrement={this.onPressMinus}
          disabled={this.state.playing}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenWidth,
  },
  foodItem: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
    backgroundColor: 'red',
    width: screenWidth / columns,
    height: screenWidth / rows,
    position: 'absolute',
    zIndex: 10,
  },
  snake: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'teal',
    backgroundColor: 'teal',
    width: screenWidth / columns,
    height: screenWidth / rows,
    position: 'absolute',
    zIndex: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gameOver: {
    marginTop: 100,
    width: screenWidth,
  },
  snakeCover: {
    width: screenWidth,
    height: screenWidth,
    position: 'absolute',
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
)(MainScreen);
