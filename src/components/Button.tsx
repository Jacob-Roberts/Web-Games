import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "border-0 bg-blue-500 py-3 px-5 text-base text-white transition-colors hover:bg-blue-600",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
