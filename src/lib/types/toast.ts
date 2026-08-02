export type ToastProps = {
  open: boolean;
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  onClose: () => void;
};
