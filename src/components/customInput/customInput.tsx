import { InputHTMLAttributes } from "react";
import { DetailedHTMLProps } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./customInput.module.css";
import clsx from "clsx";
import { FieldErrors, Path } from "react-hook-form";

type CustomInputProps<T> = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
};

const CustomInput = <T extends FieldValues>({
  label,
  register,
  name,
  errors,
  ...props
}: CustomInputProps<T>) => (
  <div className={styles.outer}>
    <label htmlFor={name} className={styles.label}>
      {label}
    </label>
    <input
      className={clsx(styles.input, errors[name] && styles.inputError)}
      {...register(name)}
      {...props}
    />
    {errors[name] && (
      <span className={styles.error}>{errors[name]?.message as string}</span>
    )}
  </div>
);

export default CustomInput;
