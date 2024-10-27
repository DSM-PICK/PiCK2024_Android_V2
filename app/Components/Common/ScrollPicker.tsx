import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "./AnimatedComponents";
import { useDebounce } from "@/hooks";
import { Text } from "./Text";

interface IProp {
  items: string[];
  onScroll: (event: string, id?: string) => void;
  suffix: string;
  id?: string;
}

export const ScrollPicker = ({ items, onScroll, suffix, id }: IProp) => {
  const { debounce } = useDebounce();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.ceil(e.nativeEvent.contentOffset.y / 40);
    if (!!items[index]) {
      debounce(() => {
        onScroll(items[index], id);
      }, 50);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        onScroll={handleScroll}
        contentContainerStyle={{ alignItems: "center", gap: 10, paddingVertical: 120 }}
        overScrollMode="never"
        snapToInterval={40}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="heading"
            fontLevel={4}
            style={{ height: 30 }}
          >
            {item}
          </Text>
        )}
      />
      <Text
        colorType="normal"
        colorLevel="black"
        fontType="heading"
        fontLevel={4}
        style={{ height: 30 }}
      >
        {suffix}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 270,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
