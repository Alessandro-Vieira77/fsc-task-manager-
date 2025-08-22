const ErrorMenssage = ({ children }) => {
  return (
    <span className="w-full pt-1 text-left text-xs text-red-500">
      {children}
    </span>
  );
};

export default ErrorMenssage;
