import React from 'react'
import { View, TextInput, Button, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native'
import ProduitItem from './ProduitItem'
import Scan from './Scan'
import { getProduitsFromApiWithSearchedText } from '../API/api'
import { connect } from 'react-redux'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            produits: [],
            isLoading: false,
        }
        this.searchedText = ""
    }

    _loadProduits() {
        console.log(this.state.searchedText) 
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true }) 
            getProduitsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({ 
                    produits: data.product,
                    isLoading: false 
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText =  text
    }

    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
    }

    _displayDetailForProduit = (idProduit) => {
        console.log("Display produit with id " + idProduit)
        this.props.navigation.navigate('ProduitDetail', { idProduit: idProduit})
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('code', 'default value'))
        let code = false;
        if(this.props.navigation.getParam('code')) {
          code = this.props.navigation.state.params.code;
        }
        return code;
    }

    render() {
        return (
        <View style={styles.main_container}>
            <TextInput
            style={styles.textinput}
            placeholder='Code bar du produit'
            onChangeText={(text) => this._searchTextInputChanged(text)}
            onSubmitEditing={() => this._loadProduits()}
            />
            <Button title='Rechercher' onPress={() => this._loadProduits()}/>
            <ProduitItem
              produit={this.state.produits}
              isPoroduitFavorite={(this.props.favoritesProduit.findIndex(produit => produit.id === this.state.produits.id) !== -1) ? true : false}
              displayDetailForProduit={this._displayDetailForProduit}
            />  
        </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
})

const mapStateToProps = state => {
  return {
    favoritesProduit: state.favoritesProduit
  }
}

export default connect(mapStateToProps)(Search)