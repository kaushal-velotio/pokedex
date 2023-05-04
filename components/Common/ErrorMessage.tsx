import { ErrorMessageProps } from "@customTypes/types";

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="text-red-500 text-sm">{message}</div>;
}

export default ErrorMessage;
