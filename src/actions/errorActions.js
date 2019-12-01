import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

toast.configure({
  position: "top-left",
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: true,
  pauseOnVisibilityChange: true,
  draggable: true,
  pauseOnHover: true
});

export const errorControlDispatch = error => (dispatch, getState) => {};

export const errorControl = error => {
  console.log({ ...error });

  if (error.response === undefined) {
    toast.error("اتصال خود را بررسی کنید");
    return;
  }

  switch (error.response.status) {
    case 500:
      toast.error("در ارتباط با سرور مشکلی به وجود آمده است");
  }

  return;
};
