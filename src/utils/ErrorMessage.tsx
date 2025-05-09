const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-red-500 text-center">{message}</p>;
};

export default ErrorMessage;
