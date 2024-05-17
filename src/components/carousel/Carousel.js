import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated
} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";

const imagenes = [
  "https://ae01.alicdn.com/kf/Hd0e81824c248413a91e8afca196052fbb.jpg_640x640Q90.jpg_.webp",
  "https://http2.mlstatic.com/D_NQ_NP_828430-MCO46196376542_052021-O.webp",
  "https://pbs.twimg.com/media/E3JMRJaXIAAxcL2?format=jpg&name=large",
  "https://fbi.cults3d.com/uploaders/15344167/illustration-file/69252289-7f9a-40f1-9307-be397108c989/005.jpg",
  "https://fbi.cults3d.com/uploaders/13318452/illustration-file/a5e10fcc-b26c-4171-8965-53d189ed2e4e/IMG_20230109_181411.jpg",
  "https://i.etsystatic.com/14360903/r/il/5c2ea8/3277705034/il_570xN.3277705034_g6ul.jpg",
  "https://fbi.cults3d.com/uploaders/24100137/illustration-file/8c49ac17-e62a-4758-a549-c05e3d6d6922/FLORK_ALL_REAL.jpeg",
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 6;
const ALTURA_BACKDROP = height * 0.4;

function Backdrop({ scrollX }) {
  return (
    <View
      style={[
        {
          height: ALTURA_BACKDROP,
          width,
          position: "absolute",
          top: 0
        },
        StyleSheet.absoluteFillObject,
      ]}
      >
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.Image
            source={{ uri: imagen }}
            key={index}
            style={[
              {
                height: ALTURA_BACKDROP,
                width: width,
                opacity,
              },
              StyleSheet.absoluteFillObject,
            ]}
          />
        );
      })}
       <LinearGradient
        colors={["transparent", "white"]}
        style={{
          width,
          height: ALTURA_BACKDROP,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
}

export default function Carousel() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingTop: 70,
          paddingHorizontal: ESPACIO_CONTENEDOR,
        }}
        snapToInterval={ANCHO_CONTENEDOR}
        decelerationRate={0}
        scrollEventThrottle={6}
        data={imagenes}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ANCHO_CONTENEDOR,
            index * ANCHO_CONTENEDOR,
            (index + 1) * ANCHO_CONTENEDOR,
          ];

          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
            
          });

          return (
            <View style={{ width: ANCHO_CONTENEDOR }}>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 34,
                  alignItems: "center",
                  transform: [{ translateY: scrollY }],
                }}
                >
                <Image
                  source={{ uri: item }}
                  style={styles.posterImage}
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  posterImage: {
    width: "90%",
    height: ANCHO_CONTENEDOR *1,
    resizeMode: "cover",
    borderRadius: 24,
  },
})