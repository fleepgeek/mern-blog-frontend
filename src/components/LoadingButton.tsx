import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";

// type LoadingButtonProps = ButtonProps & {
type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
  loadingText?: string;
};

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loadingText, isLoading, ...props }, forwardedRef) => {
    return (
      <Button {...props} ref={forwardedRef} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2
              className={`${loadingText ?? "mr-2"} h-4 w-4 animate-spin`}
            />
            {loadingText ?? props.children}
          </>
        ) : (
          props.children
        )}
      </Button>
    );
  },
);

export default LoadingButton;
