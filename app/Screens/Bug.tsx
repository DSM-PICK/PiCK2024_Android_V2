import { useMyMutation, useTheme, useToast } from "@/hooks";
import { FlatList } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import { Image, StyleSheet } from "react-native";
import * as Picker from "expo-image-picker";
import { IBugIn, instance } from "@/apis";
import { useState, memo } from "react";
import {
  Button,
  Icon,
  LabelLayout,
  Layout,
  PrevHeader,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardDismiss,
} from "@/Components";

const ImageItem = memo(function ImageItemOrigin({
  uri,
  onRemove,
}: {
  uri: string;
  fileName: string;
  onRemove: () => void;
}) {
  const { color } = useTheme();

  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        activeOpacity={0.3}
        style={{ ...styles.removeContainer, backgroundColor: color("bg") }}
        onPress={onRemove}
      >
        <Text colorType="error" fontType="caption" fontLevel={2}>
          삭제
        </Text>
      </TouchableOpacity>
      <Image style={{ width: 100, height: 100 }} source={{ uri }} />
    </View>
  );
});

export const Bug = ({ navigation }) => {
  const [status] = Picker.useMediaLibraryPermissions();
  const { error, success } = useToast();
  const { color } = useTheme();
  const { mutate: bugImageMutate } = useMutation({
    mutationFn: async (data: FormData) =>
      instance.post("/bug/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  });
  const { mutate: bugMutate } = useMyMutation<IBugIn, null>(
    "post",
    "bug",
    "/message",
  );

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
    if (!status?.granted) {
      error("갤러리 접근 권한을 허용한 후 다시 시도하세요");
      return;
    }
    let { canceled, assets } = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
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
        } as unknown as Blob),
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
        onError: () => {
          error("이미지 업로드에 실패했습니다");
          setTimeout(() => {
            error("이미지의 크기를 확인해 보세요");
          }, 1200);
        },
      });
    }
  };

  return (
    <KeyboardDismiss>
      <Layout Header={<PrevHeader title="버그 제보" />}>
        <LabelLayout required label="어디서 버그가 발생했나요?" type="black">
          <TextInput
            placeholder="예: 메인, 외출 신청"
            value={data.title}
            id="title"
            onChange={handleChange}
          />
        </LabelLayout>
        <LabelLayout required label="버그에 대해 설명해 주세요" type="black">
          <TextInput
            placeholder="자세히 설명해 주세요"
            value={data.content}
            multiLine={4}
            id="content"
            onChange={handleChange}
          />
        </LabelLayout>
        <LabelLayout label="버그 사진을 첨부해 주세요" type="black">
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
                <ImageItem
                  uri={image[index].uri}
                  fileName={item}
                  onRemove={() => {
                    setData({
                      ...data,
                      file_name: data.file_name.filter((i, idx) => {
                        if (i === item) {
                          image.filter((_, innerIndex) => innerIndex !== idx);
                        }
                        return i !== item;
                      }),
                    });
                    setImage(image.filter((i) => i.file_name !== item));
                  }}
                />
              )}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={3}
              removeClippedSubviews={true}
            />
          </View>
        </LabelLayout>
        <Button
          onPress={() =>
            bugMutate(data, {
              onSuccess: () => {
                navigation.goBack();
                success("성공적으로 제보되었습니다. 감사합니다!");
              },
            })
          }
          disabled={!!!data.title || !!!data.content}
          style={{ position: "absolute", bottom: 30 }}
        >
          제보하기
        </Button>
      </Layout>
    </KeyboardDismiss>
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
