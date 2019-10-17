const initialState = { favoritesProduit: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteProduitIndex = state.favoritesProduit.findIndex(item => item.id === action.value.id)
      if (favoriteProduitIndex !== -1) {
        nextState = {
          ...state,
          favoritesProduit: state.favoritesProduit.filter( (item, index) => index !== favoriteProduitIndex)
        }
      }
      else {
        nextState = {
          ...state,
          favoritesProduit: [...state.favoritesProduit, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite