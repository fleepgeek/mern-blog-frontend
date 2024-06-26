import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type LoadingButtonProps = {
  children: React.ReactNode;
};

export default function LoadingButton({ children }: LoadingButtonProps) {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {children}
    </Button>
  );
}
