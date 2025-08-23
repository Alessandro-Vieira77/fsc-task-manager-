const ErrorMenssage = ({ children }) => {
  return (
    <span className="w-full pt-1 text-left text-xs text-brand-danger">
      {children}
    </span>
  );
};

export default ErrorMenssage;
