import React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch } from "@mui/material";

const InputSwitchField = ({
  placeholder,
  field,
  form,
  children,
  value,
  notValue,
  className,
  onValueChange,
  ...other
}) => {
  const { value: inputValue, onChange, ...otherField } = field;
  const { setFieldValue } = form;
  const errorStatus =
    !!(form.touched &&
      form.touched[field.name] &&
      form.errors &&
      form.errors[field.name]);
  const { control, ...otherFormData } = other;
  return (
    <FormControl className={className}>
      <FormControlLabel
        control={
          <Switch
            checked={inputValue === value}
            onChange={(e, checked) => {
              setFieldValue(
                field.name,
                checked ? (value || true) : notValue || false
              );
              if (onValueChange) onValueChange(
                checked ? (value || true) : notValue || false
              );
            }}
            value={value}
            {...otherField}
            disabled={form.isSubmitting}
          />
        }
        {...otherFormData}
      />
      {errorStatus && (
        <FormHelperText color="error.main">
          {form.touched &&
            form.touched[field.name] &&
            form.errors &&
            form.errors[field.name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputSwitchField;
