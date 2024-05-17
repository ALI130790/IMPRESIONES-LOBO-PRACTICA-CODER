import React, { useEffect, useState } from "react"
import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useGetProductByIdQuery } from "../services/shopService"
import { addCartItem } from "../features/Cart/cartSlice"
import Counter from "../components/Counter"
import {reset} from "../features/Counter/counterSlice"

const ItemDetail = ({ route, navigation }) => {

  const dispatch = useDispatch()
  const [orientation, setOrientation] = useState("portrait")
  const { productId} = route.params
  const { width, height } = useWindowDimensions()
  const count = useSelector(state => state.counterReducer.value)
  const {data: product} = useGetProductByIdQuery(productId)

  useEffect(() => {
    if (width > height) setOrientation("landscape")
    else setOrientation("portrait")
  }, [width, height])

  const handleAddCart = () => {
    dispatch(addCartItem({...product, quantity: count}));
    dispatch(reset());
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
          
            <Counter count={count} handleAddCart={handleAddCart} />
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
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
    width: '100%',
    height: '60%',
  },
  imageLandscape: {
    width: '40%',
    height: 350,
  },
  textContainer: {
    fontSize: 18,
    flexDirection: "column",
    gap: 10,
  },
  textContainerLandscape: {
    fontSize: 18,
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    gap: 10,
  },
  price: {
    textAlign: 'right',
    width: '100%',
    fontSize: 18,
  },
})