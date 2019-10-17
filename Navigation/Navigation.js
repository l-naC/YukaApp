import React from 'react' 
import { StyleSheet, Image, Text } from 'react-native';
import { createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import { createStackNavigator } from 'react-navigation-stack'
import ProduitDetail from '../Components/ProduitDetail'
import Favorites from '../Components/Favorites'
import Scan from '../Components/Scan'
import List from '../Components/List'
import { createBottomTabNavigator } from 'react-navigation-tabs';

const SearchStackNavigator = createStackNavigator({
  Search: { 
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  ProduitDetail: {
      screen: ProduitDetail
  }
})

const ListStackNavigator = createStackNavigator({
  List: { 
    screen: List,
    navigationOptions: {
      title: 'List'
    }
  },
  ProduitDetail: {
      screen: ProduitDetail
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: { 
    screen: Favorites,
    navigationOptions: {
      title: 'Favorites'
    }
  },
  ProduitDetail: {
      screen: ProduitDetail
  }
})

const ScanStackNavigator = createStackNavigator({
  Scan: { 
    screen: Scan,
    navigationOptions: {
      title: 'Scan'
    }
  }
})

const ProduitsTabNavigator = createBottomTabNavigator(
    {
      List: {
        screen: ListStackNavigator,
        navigationOptions: {
          tabBarIcon: () => {
            return <Text>List</Text>
          }
        }
      },
      Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
          tabBarIcon: () => {
            return <Image
              source={require('../Images/ic_search.png')}
              style={styles.icon}/> 
          }
        }
      },
      Scan: {
        screen: ScanStackNavigator,
        navigationOptions: {
          tabBarIcon: () => { 
            return <Text>Scan</Text>
          }
        }
      },
      Favorites: {
        screen: FavoritesStackNavigator,
        navigationOptions: {
          tabBarIcon: () => {
            return <Image
              source={require('../Images/ic_favorite.png')}
              style={styles.icon}/>
          }
        }
      }
    },
    {
      tabBarOptions: {
        activeBackgroundColor: '#DDDDDD', 
        inactiveBackgroundColor: '#FFFFFF',
        showLabel: false, 
        showIcon: true
      }
    }
)
  
const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
})
export default createAppContainer(ProduitsTabNavigator)