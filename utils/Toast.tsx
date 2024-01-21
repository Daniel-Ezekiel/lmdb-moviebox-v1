import { toast } from "react-toastify";
import { ToastProps } from "../@types/index";

const notify = (props: ToastProps) => {
  const {
    message,
    position = "top-right",
    autoClose = 3000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    progress,
    theme = "dark",
    type = "success",
  } = props;

  toast(message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
    type,
    theme,
  });
};

export { notify };
