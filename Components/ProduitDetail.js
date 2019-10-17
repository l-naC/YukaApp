import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getProduitDetailFromApi } from '../API/api'
import { connect } from 'react-redux'

class ProduitDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          produit: undefined, 
          isLoading: true 
        }
    }

    componentDidMount() {
        getProduitDetailFromApi(this.props.navigation.state.params.idProduit).then(data => {
            this.setState({
              produit: data.product,
              isLoading: false
            })
        })
    }

    componentDidUpdate() {
        console.log("componentDidUpdate : ")
        console.log(this.props.favoritesProduit)
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

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.produit }
        this.props.dispatch(action)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.favoritesProduit.findIndex(item => item.id === this.state.produit.id) !== -1) {
          sourceImage = require('../Images/ic_favorite.png')
        }
        return (
          <Image
            style={styles.favorite_image}
            source={sourceImage}
          />
        )
    }
    
    _displayProduit() {
        const { produit } = this.state
        if (produit != undefined) {
          return (
            <ScrollView style={styles.scrollview_container}>
                <Image
                style={styles.image}
                source={{uri: produit.image_url}}
                />
                <Text style={styles.title_text}>{produit.product_name}</Text>
                <TouchableOpacity
                    style={styles.favorite_container}
                    onPress={() => this._toggleFavorite()}>
                    {this._displayFavoriteImage()}
                </TouchableOpacity>
                <Text style={styles.description_text}>{produit.generic_name}</Text>
                <Text style={styles.default_text}>Ingredients : {produit.ingredients_text_with_allergens_fr}</Text>
                <Text style={styles.default_text}>Categorie : {produit.categories}</Text>
            </ScrollView>
          )
        }
    }
    
    render() {
        return (
        <View style={styles.main_container}>
            {this._displayLoading()}
            {this._displayProduit()}
        </View>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center', 
  },
  favorite_image: {
    width: 40,
    height: 40
  }
})
const mapStateToProps = (state) => {
    return {
        favoritesProduit: state.favoritesProduit
    }
}

export default connect(mapStateToProps)(ProduitDetail)