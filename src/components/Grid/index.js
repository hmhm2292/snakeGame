import React, {PureComponent} from 'react';
import {FlatList, View, Dimensions, StyleSheet} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const rows = 35;
const columns = 35;

export class Grid extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderGridItem = ({item, index}) => {
    return <View key={index} style={styles.gridItem} />;
  };

  render() {
    const {grid, gridColumns} = this.props;
    return (
      <FlatList
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        data={grid}
        renderItem={this.renderGridItem}
        numColumns={gridColumns}
      />
    );
  }
}

export default Grid;

const styles = StyleSheet.create({
  gridItem: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    width: screenWidth / columns,
    height: screenWidth / rows,
  },
});
