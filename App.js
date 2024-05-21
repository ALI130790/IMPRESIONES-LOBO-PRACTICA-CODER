import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import { colors } from "./src/constants/colors"
import { useFonts } from "expo-font"
import Navigator from "./src/navigation/Navigator"
import { Provider } from "react-redux"
import store from "./src/store"
import { initSQLiteDB } from "./src/persistence"


(async () => {
  try {
    if (Platform.OS !== 'web') {

      const response = await initSQLiteDB()
    }
  } catch (error) {

  }
})()

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
  })

  if (!fontsLoaded || fontError) {
    return null
  }

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Navigator />
        </Provider>
        <StatusBar />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.teal400,
  },
})

export default App