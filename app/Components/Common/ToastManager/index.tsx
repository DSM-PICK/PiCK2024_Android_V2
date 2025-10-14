import { useToast } from "@/hooks";
import { Toast } from "./Toast";
import { memo } from "react";

const ToastManagerComponent = () => {
  const { toasts } = useToast();

  return toasts.map((i) => (
    <Toast id={i.id} message={i.message} type={i.type} wasWait={i.wasWait} key={i.id} />
  ));
};

export const ToastManager = memo(ToastManagerComponent);
