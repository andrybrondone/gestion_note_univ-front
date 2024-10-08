import clsx from "clsx";
import { FieldAttributes, useField } from "formik";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  htmlFor: string;
  className?: string;
}

export function CheckBox({
  label,
  id,
  htmlFor,
  className,
  ...props
}: InputProps) {
  const [field, meta] = useField(props as FieldAttributes<string>);

  return (
    <div className="flex flex-col gap-1 dark:text-white">
      <div className="flex items-center gap-2">
        <input
          {...field}
          {...props}
          autoComplete="off"
          id={id}
          className={clsx(
            meta.touched && meta.error
              ? "border-alert-danger focus:ring-alert-danger dark:focus:ring-alert-danger dark:border-alert-danger"
              : "focus:ring-secondary border-gray-400 dark:focus:ring-dark-secondary dark:border-gray-800",
            "p-3 w-full font-light border rounded focus:outline-none focus:ring-1 dark:text-primary-200 dark:bg-gray-800 placeholder-gray-700 dark:placeholder-gray-500/80",
            className
          )}
        />
        <label
          className="max-md:text-caption2 max-sm:text-caption4"
          htmlFor={htmlFor}
        >
          {label}
        </label>
      </div>
      <div className="h-3">
        {meta.touched && meta.error && (
          <div className="text-alert-danger text-caption4"></div>
        )}
      </div>
    </div>
  );
}
