import { StatusBar } from "expo-status-bar"
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native"

const images = [
  require("./images/image-0.jpeg"),
  require("./images/image-1.jpeg"),
  require("./images/image-2.jpeg"),
  require("./images/image-3.jpeg"),
  require("./images/image-4.webp"),
  require("./images/image-5.jpeg"),
  require("./images/image-6.jpeg"),
  require("./images/image-7.png"),
  require("./images/image-8.jpeg"),
  require("./images/image-9.jpeg")
]

const IMAGE_THUMBNAIL_SIZE = 82

const { width, height } = Dimensions.get("screen")

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={images}
        key={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={item}
                style={[StyleSheet.absoluteFillObject, { width, height }]}
              />
            </View>
          )
        }}
        pagingEnabled
        horizontal
      />
      <FlatList
        data={images}
        key={(_, index) => `thumbnail-${index.toString()}`}
        showsHorizontalScrollIndicator={false}
        style={{
          position: "absolute",
          bottom: 62
        }}
        renderItem={({ item }) => {
          return (
            <Image
              source={item}
              style={{
                width: IMAGE_THUMBNAIL_SIZE,
                height: IMAGE_THUMBNAIL_SIZE,
                borderRadius: 12
              }}
            />
          )
        }}
        horizontal
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
