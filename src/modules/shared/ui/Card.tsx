import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "stepflow-card p-6",
        hover && "hover:border-[rgb(var(--primary))/0.3] transition-all duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
