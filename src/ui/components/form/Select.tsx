import clsx from "clsx";
import { FieldAttributes, useField } from "formik";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, ...props }: SelectProps) {
  const [field, meta] = useField(props as FieldAttributes<string>);

  return (
    <div className="flex flex-col gap-1">
      <label>
        {label} <span className="text-alert-danger">*</span>
      </label>

      <select
        {...field}
        {...props}
        className={clsx(
          meta.touched && meta.error
            ? "border-alert-danger focus:ring-alert-danger dark:focus:ring-alert-danger dark:border-alert-danger"
            : "focus:ring-secondary border-gray-400 dark:focus:ring-dark-secondary dark:border-gray-800",
          "p-3 w-full font-light border rounded focus:outline-none focus:ring-1 dark:text-primary-200 dark:bg-gray-800 placeholder-gray-700 dark:placeholder-primary-300"
        )}
      />
      <div className="h-3">
        {meta.touched && meta.error && (
          <div className="text-alert-danger text-caption4">{meta.error}</div>
        )}
      </div>
    </div>
  );
}
