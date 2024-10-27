import { useMyMutation, useTheme, useToast } from "@/hooks";
import { FlatList } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Image, StyleSheet } from "react-native";
import { IBugIn, instance } from "@/apis";
import { useState } from "react";
import {
  Button,
  Icon,
  LabelLayout,
  Layout,
  PrevHedaer,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "@/Components";

export const Bug = ({ navigation }) => {
  const { color } = useTheme();
  const { error, success } = useToast();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const { mutate: bugImageMutate } = useMutation({
    mutationFn: async (data: FormData) =>
      instance.post("/bug/upload", data, { headers: { "Content-Type": "multipart/form-data" } }),
  });
  const { mutate: bugMutate } = useMyMutation<IBugIn, null>("post", "bug", "/message");

  const [image, setImage] = useState([]);
  const [data, setData] = useState<IBugIn>({
    title: "",
    content: "",
    file_name: [],
    model: "ANDROID",
  });

  const handleChange = (text: string, id: string) => {
    setData({ ...data, [id]: text });
  };

  const handleImageChange = async () => {
    if (!status.granted) {
      requestPermission().then(() => {
        if (!status.granted) {
          error("사진 권한을 취득할 수 없습니다.");
          return;
        }
      });
    }
    let { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!canceled) {
      const formData = new FormData();
      assets.map((i) =>
        formData.append("file", {
          uri: i.uri,
          type: i.mimeType,
          name: i.fileName,
        } as unknown as Blob)
      );

      bugImageMutate(formData, {
        onSuccess: ({ data: res }) => {
          setImage([
            ...image,
            ...assets.map(({ uri }, index) => {
              return { uri, file_name: res[index] };
            }),
          ]);
          setData({ ...data, file_name: [...data.file_name, ...res] });
        },
      });
    }
  };

  return (
    <Layout Header={<PrevHedaer title="버그 제보" />}>
      <LabelLayout label="어디서 버그가 발생했나요?">
        <TextInput
          placeholder="예: 메인, 외출 신청"
          value={data.title}
          id="title"
          onChange={handleChange}
        />
      </LabelLayout>
      <LabelLayout label="버그에 대해 설명해 주세요">
        <TextInput
          placeholder="자세히 설명해 주세요"
          value={data.content}
          multiLine={4}
          id="content"
          onChange={handleChange}
        />
      </LabelLayout>
      <LabelLayout label="버그 사진을 첨부해 주세요">
        <View style={styles.imageListContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              ...styles.addImage,
              width: !!data.file_name.length ? 100 : "100%",
              backgroundColor: color("gray", 50),
              borderColor: color("gray", 600),
            }}
            onPress={handleImageChange}
          >
            <Icon name="Image" />
          </TouchableOpacity>
          <FlatList
            data={data.file_name}
            horizontal
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item, index }) => (
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={{ ...styles.removeContainer, backgroundColor: color("bg") }}
                >
                  <Text
                    colorType="error"
                    fontType="caption"
                    fontLevel={2}
                    onPress={() => {
                      setData({
                        ...data,
                        file_name: data.file_name.filter((i, index) => {
                          if (i === item) {
                            image.filter((_, innerIndex) => innerIndex !== index);
                          }
                          return i !== item;
                        }),
                      });
                      setImage(image.filter((i) => i.file_name !== item));
                    }}
                  >
                    삭제
                  </Text>
                </TouchableOpacity>
                <Image style={{ width: 100, height: 100 }} source={{ uri: image[index].uri }} />
              </View>
            )}
          />
        </View>
      </LabelLayout>
      <Button
        onPress={() =>
          bugMutate(data, {
            onSuccess: () => {
              navigation.goBack();
              success("성공적으로 제출되었습니다. 감사합니다!");
            },
          })
        }
        style={{ position: "absolute", bottom: 30 }}
      >
        제보하기
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageListContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  addImage: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1,
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  removeContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 100,
    zIndex: 30,
    position: "absolute",
    top: 10,
    right: 10,
  },
});
