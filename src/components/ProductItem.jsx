import { Image, StyleSheet, Text } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../constants/colors'

const ProductItem = ({ product }) => {
  return (
    <Card style={styles.additionalStylesCard}>
     
      <Text style={styles.textCategory}>{product.title}</Text>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={{ uri: product.images[0] }}
      />
     
    </Card>
  )
}

export default ProductItem
 
const styles = StyleSheet.create({
  image: {
    height: 120,
    width: '40%',
    borderRadius: 8,
  },
  additionalStylesCard: {
    paddingLeft: 10,
    flexDirection: 'row',
    height: 120,
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  textCategory: {
    color: colors.teal200,
    width: '60%',
    fontSize: 18
  }
})