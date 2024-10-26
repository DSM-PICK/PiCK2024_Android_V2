import { Icon, Text, TouchableOpacity, View } from "@/Components";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { getDiff } from "@/utils";

interface IProp {
  id: string;
  title: string;
  date: string;
  showNew?: boolean;
}

export const Item = ({ id, title, showNew, date }: IProp) => {
  const navigate = useNavigation();
  const formedTitle = title?.length > 30 ? title.slice(0, 30) + "..." : title;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => navigate.navigate(...(["상세보기", { id, title: formedTitle }] as never))}
    >
      <Icon name="Chat" size={40} colorType="main" colorLevel={600} />
      <View style={{ gap: 4 }}>
        <View style={styles.titleContainer}>
          <Text colorType="normal" colorLevel="black" fontType="label" fontLevel={1}>
            {formedTitle}
          </Text>
          {showNew && <Icon name="New" size={20} colorType="main" colorLevel={300} />}
        </View>
        <Text colorType="gray" colorLevel={600} fontType="label" fontLevel={2}>
          {getDiff(date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
});
