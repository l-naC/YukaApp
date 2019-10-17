import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FadeIn from '../Animations/FadeIn'

class ProduitItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isProduitFavorite) {
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }

  render() {
    const { produit, displayDetailForProduit } = this.props
    return (
      <FadeIn>
        <TouchableOpacity 
          style={styles.main_container}
          onPress={() => displayDetailForProduit(produit.id)}
        >
          <Image
            style={styles.image}
            source={{uri: produit.image_url}}
            />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
                <Text style={styles.title_text}  numberOfLines={5}>{produit.product_name}</Text>
            </View>
            <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={5}>{produit.generic_name}</Text>
                <Text style={styles.description_text}  numberOfLines={4}>Ingredients : {produit.ingredients_text_with_allergens_fr}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
    main_container: {
      height: 190,
      flexDirection: 'row'
    },
    image: {
      width: 120,
      height: 180,
      margin: 5,
      backgroundColor: 'gray'
    },
    content_container: {
      flex: 1,
      margin: 5
    },
    header_container: {
      flex: 3,
      flexDirection: 'row'
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
    },
    description_container: {
      flex: 7
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666'
    }
})

export default ProduitItem