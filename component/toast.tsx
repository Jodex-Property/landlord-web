import React from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Icon from "../assets/icons";
import classNames from "classnames";


const Toast: React.FC = () => {
  const defaultOptions: ToastOptions = {
    position: "top-right", // Keeping your original position
    autoClose: 2000, // Keeping your original timeout
    hideProgressBar: true, // Remove progress bar to match screenshot
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  return (
    <>
      <ToastContainer
        {...defaultOptions}
        className="toast-message-container mt-5 mx-auto w-[400px]"
        limit={1}
      />
    </>
  );
};

export const showToast = (
  message: string | undefined,
  status: boolean,
  options?: ToastOptions
) => {
  const defaultSuccessMessage = "Operation successful";
  const defaultErrorMessage = "Operation failed";

  const ToastMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-3 items-start flex-1">
        {/* {status ? (
          <Icon name="toastMarkIcon" />
        ) : (
          <Icon name="toastCloseIcon" />
        )} */}
        <div>
          <p className={classNames("text-sm text-[#6B7280]", {
             "text-green-500": status,
             "text-red-500": !status,
          })}>
            {message || (status ? defaultSuccessMessage : defaultErrorMessage)}
          </p>
        </div>
      </div>
    </div>
  );

  const toastOptions: ToastOptions = {
    className: status ? "toast-success" : "toast-error",
    style: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      padding: "16px",
      minHeight: "unset",
      color: "#1F2937",
      width: "400px",
    },
    ...options,
  };

  toast(
    <ToastMessage
      message={
        message || (status ? defaultSuccessMessage : defaultErrorMessage)
      }
    />,
    toastOptions
  );
};

export default Toast;
