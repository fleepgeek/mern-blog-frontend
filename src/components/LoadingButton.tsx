import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { AlertDialogTriggerProps } from "@radix-ui/react-alert-dialog";
import React from "react";

// type LoadingButtonProps = {
//   text?: string;
//   children: React.ReactNode;
// };

type LoadingButtonProps = AlertDialogTriggerProps & {
  // Can have additional props
  // text?: string;
};

// TODO: Update the props to more generic one
const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  // (props: AlertDialogTriggerProps, forwardedRef) => {
  (props, forwardedRef) => {
    return (
      <Button {...props} ref={forwardedRef} disabled>
        <Loader2
          className={`${props.children && "mr-2"} h-4 w-4 animate-spin`}
        />
        {props.children || ""}
      </Button>
    );
  },
);

export default LoadingButton;
