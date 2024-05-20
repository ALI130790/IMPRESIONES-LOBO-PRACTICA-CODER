import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import CategoryItem from "../components/CategoryItem"
import { useGetCategoriesQuery } from "../services/shopService"
import ShopLayout from "../components/ShopLayout"

const Home = ({route, navigation }) => {
  const {data: categories, error, isLoading} = useGetCategoriesQuery()

  return (

    <ShopLayout>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(elementoDeArray) => elementoDeArray}
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem
            navigation={navigation}
            category={item}
          />
        )}
      />
    </ShopLayout>
  )
}

export default Home

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
    backgroundColor: colors.platinum,
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
})
