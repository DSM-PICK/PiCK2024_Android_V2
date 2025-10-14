import { Button, Layout, PrevHeader, Text, TimePicker, TouchableOpacity, View } from "@/Components";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from "react-native";
import { useBottomSheet, useDebounce, useMyMutation, useTheme, useToast } from "@/hooks";
import { FlatList } from "react-native-gesture-handler";
import { IClassRoomMoveIn } from "@/apis";
import { useRef, useState } from "react";
import { moveTable } from "@/constants";

const { width } = Dimensions.get("window");

export const Move = ({ navigation }) => {
  const [data, setData] = useState<IClassRoomMoveIn>({
    floor: 1,
    classroom_name: undefined,
    start: 1,
    end: 1,
  });

  const { debounce } = useDebounce();
  const { open } = useBottomSheet();
  const { success } = useToast();
  const { color } = useTheme();

  const ref = useRef(null);

  const { mutate: moveMutate } = useMyMutation<IClassRoomMoveIn, null>("post", "classroom", "/move");

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    if (!!moveTable[index]) {
      debounce(() => {
        setData({ ...data, floor: index + 1 });
      }, 50);
    }
  };

  return (
    <Layout Header={<PrevHeader title="교실 이동 신청" />} style={{ paddingHorizontal: 0, gap: 20 }}>
      <View style={styles.titleContainer}>
        <Text colorType="normal" colorLevel="black" fontType="heading" fontLevel={4}>
          교실 이동
        </Text>
        <Text colorType="gray" colorLevel={600} fontType="body" fontLevel={2}>
          자습 감독 선생님께서 수락 후 이동할 수 있습니다.
        </Text>
      </View>
      <View>
        <View style={{ width: "100%", flexDirection: "row" }}>
          {moveTable.map((_, index) => (
            <TouchableOpacity
              style={{
                ...styles.floorButton,
                width: `${100 / moveTable.length}%`,
                borderBottomColor: color("main", 400, true),
                borderBottomWidth: index + 1 === data.floor ? 1 : 0,
              }}
              onPress={() => ref?.current && ref.current.scrollToOffset({ offset: width * index })}
              activeOpacity={0.6}
            >
              <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
                {index + 1 + "층"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          initialNumToRender={1}
          ref={ref}
          disableIntervalMomentum={true}
          data={moveTable}
          horizontal
          onScroll={handleScroll}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          keyExtractor={(_, index) => index + ""}
          renderItem={({ item }) => (
            <View style={styles.itemsContainer}>
              {item.map((i) => (
                <TouchableOpacity
                  style={{
                    ...styles.item,
                    borderColor: color("main", 100, true),
                    backgroundColor: data.classroom_name === i ? color("main", 100, true) : "transparent",
                  }}
                  onPress={() => setData({ ...data, classroom_name: i })}
                  activeOpacity={0.6}
                >
                  <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
                    {i}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          disabled={!!!data.classroom_name}
          onPress={() =>
            open(
              <TimePicker
                type="classMulti"
                title="교실 이동 시간을 선택해주세요"
                buttonTitle="신청하기"
                onEnd={(e) =>
                  moveMutate(
                    { ...data, start: Number(e.hour), end: Number(e.minute) },
                    {
                      onSuccess: () => {
                        navigation.goBack();
                        success("교실 이동 신청이 완료되었습니다!");
                      },
                    }
                  )
                }
              />
            )
          }
        >
          다음
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  titleContainer: { gap: 10, alignSelf: "flex-start", paddingHorizontal: 24 },
  floorButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  itemsContainer: {
    width,
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 24,
    gap: 15,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 20,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
  },
});
