import React from 'react'
import{StyleSheet,View, FlatList, Text} from 'react-native'
import { getProduitsFromApi } from '../API/api'
import ProduitItem from './ProduitItem'
 
class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            produits:[]
        }
    }
 
    _loadProduit(){
        getProduitsFromApi("pizza").then(data => {
            this.setState({ produits: data.products })
        })
    }

    _displayDetailForProduit = (idProduit) => {
        this.props.navigation.navigate('ProduitDetail', {idProduit: idProduit})
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                {this._loadProduit()}
                <FlatList
                data = {this.state.produits} 
                keyExtractor={(item) => item.code.toString()}
                renderItem={({item}) => 
                    <ProduitItem 
                    produit={item} 
                    displayDetailForProduit={this._displayDetailForProduit}
                    />
                }>
                </FlatList>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    mainContainer: {
        flex:1
    }
})
 
export default List