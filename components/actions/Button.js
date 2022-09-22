import LoaderDots from "../utils/loaderDots";

export default function Button({
  children,
  onClick,
  type,
  disabled,
  className,
  isLoading = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {!isLoading && children}
      {isLoading && <LoaderDots size={"s"} color={"white"} />}
    </button>
  );
}
