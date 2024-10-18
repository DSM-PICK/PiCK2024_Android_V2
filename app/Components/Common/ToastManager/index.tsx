import { useToast } from "@/hooks";
import { Toast } from "./Toast";

export const ToastManager = () => {
  const { toasts } = useToast();

  return toasts.map((i) => (
    <Toast id={i.id} message={i.message} type={i.type} wasWait={i.wasWait} key={i.id} />
  ));
};
