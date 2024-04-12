import { StyleSheet, View } from "react-native"
import Home from "./src/screens/Home"
import { colors } from "./src/constants/colors"
import Header from "./src/components/Header"
import ItemListCategory from "./src/screens/ItemListCategory"
import { useState } from "react"

const App = () => {

  const [categorySelected, setCategorySelected] = useState("")

  return (
    <View style={styles.container}>
      <Header title={"CATEGORIAS"} />
      {categorySelected ? (
        <ItemListCategory categorySelected={categorySelected} />
      ) : (
        <Home setCategorySelected={setCategorySelected} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.teal200,
  },
})

export default App
