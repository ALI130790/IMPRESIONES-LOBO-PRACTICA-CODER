import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import products from "../data/products.json"
import ProductItem from "../components/ProductItem"
import Search from "../components/Search"
import { useEffect, useState } from "react"

const ItemListCategory = ({
  
  setCategorySelected = () => {},
  navigation,
  route
}) => {

  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

  const {category : categorySelected} = route.params
  useEffect(() => {
    //Filtrar por categoria

    const regexDigits = /\d/
    const hasDigits = regexDigits.test(keyWord)
    if (hasDigits) {
      setError("Don't use digits")
      return
    }
   
    const regexThreeOrMore = /[a-zA-Z]{3,}/
    const hasThreeOrMoreChars = regexThreeOrMore.test(keyWord)

    if (!hasThreeOrMoreChars && keyWord.length) {
      setError("Escriba 3 o más dígitos")
      return
    }

    const productsPrefiltered = products.filter(
      (product) => product.category === categorySelected
    )
    
    //Filtrado por nombre
    const productsFilter = productsPrefiltered.filter((product) =>
      product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
    )
    setProductsFiltered(productsFilter)
    setError("")
  }, [keyWord, categorySelected])

  return (
    <View style={styles.flatListContainer}>
      <Search
        error={error}
        onSearch={setKeyword}
        goBack={() => navigation.goBack()}
      />
      <FlatList
        data={productsFiltered}
        renderItem={({ item }) => (
          <ProductItem product={item} navigation={navigation}/>
        )}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  )
}


export default ItemListCategory

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.teal400,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
})