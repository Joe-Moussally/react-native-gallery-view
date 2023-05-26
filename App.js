import { StatusBar } from "expo-status-bar"
import { useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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
const GAP = 10

const { width, height } = Dimensions.get("screen")

export default function App() {
  // flatlist reds
  const imageViewRef = useRef()
  const imagePickerRef = useRef()

  // active image index
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0)

  // scroll to active image
  const scrollToActiveThumbnailIndex = (index) => {
    setActiveThumbnailIndex(index)
    imageViewRef?.current?.scrollToOffset({
      animated: true,
      offset: index * width
    })

    // image active index postion > screen width/2 do not scroll
    // !!! to avoid scroll for the first 2 or 3 thumbnail where their position is < screen width/2 !!!
    if (
      index * (GAP + IMAGE_THUMBNAIL_SIZE) - IMAGE_THUMBNAIL_SIZE / 2 >
      width / 2
    ) {
      imagePickerRef?.current?.scrollToOffset({
        animated: true,
        offset:
          index * (IMAGE_THUMBNAIL_SIZE + GAP) -
          width / 2 +
          IMAGE_THUMBNAIL_SIZE / 2
      })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <FlatList
        ref={imageViewRef}
        data={images}
        onMomentumScrollEnd={(e) => {
          const i = e.nativeEvent.contentOffset.x / width
          setActiveThumbnailIndex(Math.floor(i))
          scrollToActiveThumbnailIndex(i)
        }}
        key="image-view"
        keyExtractor={(_, index) => `image-${index}`}
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
        ref={imagePickerRef}
        data={images}
        key="image-picker"
        keyExtractor={(_, index) => `thumbnail-${index}`}
        showsHorizontalScrollIndicator={false}
        style={{
          position: "absolute",
          bottom: 62
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                scrollToActiveThumbnailIndex(index)
              }}
            >
              <Image
                source={item}
                style={{
                  width: IMAGE_THUMBNAIL_SIZE,
                  height: IMAGE_THUMBNAIL_SIZE,
                  borderRadius: 18,
                  marginRight: GAP,
                  borderWidth: 2,
                  borderColor:
                    index === activeThumbnailIndex ? "white" : "transparent"
                }}
              />
            </TouchableOpacity>
          )
        }}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: GAP
        }}
      />
    </View>
  )
}
