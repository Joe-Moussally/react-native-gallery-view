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

const { width, height } = Dimensions.get("screen")

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={images}
        key={(_, index) => index.toString()}
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
