import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ProduitItem from './ProduitItem'
import { connect } from 'react-redux'

class ProduitList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      produits: []
    }
  }

  _displayDetailForProduit = (idProduit) => {
    console.log("Display Produit " + idProduit)
    this.props.navigation.navigate('ProduitDetail', {idProduit: idProduit})
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.produits}
        extraData={this.props.favoritesProduit}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <FilmItem
          produit={item}
          isProduitFavorite={(this.props.favoritesProduit.findIndex(produit => produit.id === item.id) !== -1) ? true : false}
          displayDetailForProduit={this._displayDetailForProduit}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesProduit: state.favoritesProduit
  }
}

export default connect(mapStateToProps)(ProduitList)