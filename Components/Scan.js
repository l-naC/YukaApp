import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ProduitItem from './ProduitItem'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Scan extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    code: ""
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
            <TouchableOpacity 
                style={styles.main_container}
                onPress={() => this.props.navigation.navigate('Search', { code : this.state.code})}
            ><Text style={styles.code}>Le code bar est {this.state.code}</Text></TouchableOpacity>
            
        )}
        {scanned && (
          <Button title={'Scanner de nouveau'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ 
        scanned: true,
        code: data
    });
    alert(`Code bar : type ${type} and numero ${data} ont été scanné !`);
  };
}

const styles = StyleSheet.create({
    code: {
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: 5,
    }
})
