import { useNavigation } from "@react-navigation/native";
import { Icon, Text, View } from "../Common";
import { StyleSheet } from "react-native";

interface IProp {
  title: string;
}

export const PrevHedaer = ({ title }: IProp) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Icon
        colorType="normal"
        colorLevel="black"
        size={20}
        name="Arrrow"
        rotate="left"
        style={styles.icon}
        onPress={() => goBack()}
      />
      <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    position: "relative",
    paddingVertical: 8,
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    left: 24,
  },
});
