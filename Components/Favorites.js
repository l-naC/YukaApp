import React from 'react'
import { StyleSheet, Text } from 'react-native'
import ProduitList from './ProduitList'
import { connect } from 'react-redux'

class Favorites extends React.Component {

  render() {
    return (
      <ProduitList 
      produits={this.props.favoritesProduit}
      navigation={this.props.navigation}
      favoriteList={true}
      />
    )
  }
}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)