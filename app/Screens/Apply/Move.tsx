import { IClassRoomMoveIn } from "@/apis";
import { Button, Layout, PrevHedaer, Text, TimePicker, TouchableOpacity, View } from "@/Components";
import { moveTable } from "@/constants";
import { useBottomSheet, useDebounce, useMyMutation, useTheme, useToast } from "@/hooks";
import { useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export const Move = ({ navigation }) => {
  const [data, setData] = useState<IClassRoomMoveIn>({
    floor: 1,
    classroom_name: undefined,
    start: 1,
    end: 1,
  });
  const { debounce } = useDebounce();
  const { open } = useBottomSheet();
  const { color } = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const { mutate: moveMutate } = useMyMutation<IClassRoomMoveIn, null>(
    "post",
    "classroom",
    "/move"
  );
  const { success } = useToast();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
    if (!!moveTable[index]) {
      debounce(() => {
        setData({ ...data, floor: index + 1 });
      }, 50);
    }
  };

  return (
    <Layout
      Header={<PrevHedaer title="교실 이동 신청" />}
      style={{ paddingHorizontal: 0, gap: 20 }}
    >
      <View style={{ gap: 10, alignSelf: "flex-start", paddingHorizontal: 24 }}>
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
            <View
              style={{
                width: `${100 / moveTable.length}%`,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderBottomColor: color("main", 400, true),
                borderBottomWidth: index + 1 === data.floor ? 1 : 0,
              }}
            >
              <Text colorType="normal" colorLevel="black" fontType="body" fontLevel={1}>
                {index + 1 + ""}
              </Text>
            </View>
          ))}
        </View>
        <FlatList
          data={moveTable}
          horizontal
          onScroll={handleScroll}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          snapToInterval={windowWidth}
          keyExtractor={(item, index) => index + ""}
          renderItem={({ item }) => (
            <View
              style={{
                width: windowWidth,
                flexWrap: "wrap",
                flexDirection: "row",
                padding: 24,
                gap: 15,
              }}
            >
              {item.map((i) => (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    borderRadius: 100,
                    borderColor: color("main", 100, true),
                    borderWidth: 1,
                    backgroundColor:
                      data.classroom_name === i ? color("main", 100, true) : "transparent",
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

      <View style={{ width: "100%", position: "absolute", bottom: 30, paddingHorizontal: 20 }}>
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
                        success("성공적으로 신청되었습니다!");
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
