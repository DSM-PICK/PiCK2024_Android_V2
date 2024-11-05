import { changeType, TimePicker, typeType } from "./TimePicker";
import { Text, TouchableWithoutFeedback } from "./Common";
import { useBottomSheet, useTheme } from "@/hooks";

interface IProp {
  title: string;
  type: typeType;
  value: string;
  onChange: changeType;
  id?: string;
}

export const TimePickerButton = ({ title, type, value, onChange, id }: IProp) => {
  const { open } = useBottomSheet();
  const { color } = useTheme();

  return (
    <TouchableWithoutFeedback
      style={{
        width: 100,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: color("gray", 50, true),
      }}
      onPress={() =>
        open(
          <TimePicker
            id={id}
            title={title}
            buttonTitle="선택 완료"
            type={type}
            onEnd={(e, id) => onChange(e, id)}
          />
        )
      }
    >
      <Text
        colorType={!!value ? "normal" : "gray"}
        colorLevel={!!value ? "black" : 500}
        fontType="caption"
        fontLevel={1}
      >
        {value || "선택"}
      </Text>
    </TouchableWithoutFeedback>
  );
};
