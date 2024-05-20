import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCartItem } from "../features/Cart/cartSlice"
import { useGetProductByIdQuery } from "../services/shopService"
import Counter from "../components/Counter"
import { colors } from "../constants/colors"

const ItemDetail = ({ route, navigation }) => {

  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const [orientation, setOrientation] = useState("portrait")
  const { width, height } = useWindowDimensions()
  const { productId: idSelected } = route.params
  const { data: product } = useGetProductByIdQuery(idSelected)

  useEffect(() => {
    if (width > height) setOrientation("landscape")
    else setOrientation("portrait")
  }, [width, height])

  const handleAddCart = () => {
    dispatch(addCartItem({ ...product, quantity: 1 }))
  }

  return (
    <View>
      <Button onPress={() => navigation.goBack()} title="Volver a la pagina anterior" />
      {product ? (
        <View
          style={
            orientation === "portrait" ?
              styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: product.images[0] }}
            style={orientation === "portrait" ? styles.image : styles.imageLandscape}
            resizeMode="cover"
          />
          <View style={orientation === "portrait" ? styles.textContainer : styles.textContainerLandscape}>

            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Button title="Agregar al carrito" onPress={handleAddCart}></Button>
          </View>
        </View>
      ) : null}
      <Counter />
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.teal200,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 20,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
  },
  image: {
    width: '60%',
    height: '50%',

  },
  imageLandscape: {
    width: '40%',
    height: 350,
  },
  textContainer: {
    fontSize: 20,
    flexDirection: "column",
    gap: 10,
  },
  textContainerLandscape: {
    fontSize: 20,
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    gap: 10,
  },
  price: {
    textAlign: 'right',
    width: '100%',
    fontSize: 20,
  },
})