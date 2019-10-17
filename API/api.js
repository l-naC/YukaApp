export function getProduitsFromApiWithSearchedText (text) {
  const url = 'https://world.openfoodfacts.org/api/v0/product/' + text
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getProduitDetailFromApi (id) {
    const url = 'https://world.openfoodfacts.org/api/v0/product/' + id
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getProduitsFromApi (text) {
  const url = 'https://fr.openfoodfacts.org/categorie/' + text + '.json'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}