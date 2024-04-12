import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import products from "../data/products.json"
import ProductItem from "../components/ProductItem"
import Search from "../components/Search"
import { useEffect, useState } from "react"

const ItemListCategory = ({categorySelected = ""}) => {
  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])


  useEffect(() => {
    const productsFilter = products.filter(product => product.title.includes(keyWord))
    for (const productFilter of productsFilter) {

    }
    setProductsFiltered(productsFilter)
  }, [keyWord])

  return (
    <View style={styles.flatListContainer} >
      <Search onSearch={setKeyword} />
      <FlatList
        data={productsFiltered}
        renderItem={({ item }) => <ProductItem product={item} />}
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