import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import ProductItem from "../components/ProductItem"
import Search from "../components/Search"
import { useEffect, useState } from "react"
import { useGetProductsByCategoryQuery } from "../services/shopService"


const ItemListCategory = ({
  setCategorySelected = () => { },
  navigation,
  route
}) => {
 
  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

  const { category: categorySelected } = route.params

  const { data: productsFetched, error: errorFromFetch, isLoading } = useGetProductsByCategoryQuery(categorySelected)

  useEffect(() => {
    //Filtrar por categoria
    const regexDigits = /\d/
    const hasDigits = regexDigits.test(keyWord)
    if (hasDigits) {
      setError("No uses dígitos")
      return
    }
    const regexThreeOrMore = /[a-zA-Z]{3,}/
    const hasThreeOrMoreChars = regexThreeOrMore.test(keyWord)

    if (!hasThreeOrMoreChars && keyWord.length) {
      setError("Escriba 3 o más dígitos")
      return
    }

    //Filtrar por nombre
    if (!isLoading) {
      const productsFilter = productsFetched.filter((product) =>
        product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
      )
      setProductsFiltered(productsFilter)
      setError("")
    }
  }, [keyWord, categorySelected, productsFetched, isLoading])

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
          <ProductItem product={item} navigation={navigation} />
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