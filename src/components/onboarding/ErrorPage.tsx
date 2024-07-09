import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

interface Props {
  title: string;
  subtitle: string;
}

const ErrorPage = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{subtitle}</AlertDescription>
      </Alert>
      <Button className="mt-4" onClick={() => (window.location.href = "/")}>
        Return to login
      </Button>
    </div>
  );
};
export default ErrorPage
