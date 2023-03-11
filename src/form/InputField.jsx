import React from "react";
import { TextField } from "@mui/material";

const InputField = ({
  placeholder,
  field,
  form,
  error,
  helperText,
  children,
  onValueChange,
  ...other
}) => {
  const meta = form.getFieldMeta(field.name);
  const { onChange, ...otherField } = field
  return (
    <TextField
      placeholder={placeholder}
      {...otherField}
      {...other}
      onChange={
        (...data) => {
          onChange(...data)
          if (onValueChange) {
            onValueChange(...data)
          }
        }
      }
      disabled={other.disabled || form.isSubmitting}
      error={meta.touched && meta.error ? true : false || error}
      helperText={(meta.touched && meta.error) || helperText}
    >
      {children}
    </TextField>
  );
};

export default InputField;
