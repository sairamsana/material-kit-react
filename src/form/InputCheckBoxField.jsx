import React from "react";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";

const InputField = ({
  placeholder,
  field,
  form,
  children,
  value,
  className,
  ...other
}) => {
  const { value: inputValue, onChange, ...otherField } = field;
  const { setFieldValue } = form;
  const errorStatus =
    form.touched &&
    form.touched[field.name] &&
    form.errors &&
    form.errors[field.name];
  return (
    <FormControl className={className}>
      <FormControlLabel
        control={
          <Checkbox
            checked={inputValue === value}
            onChange={(e, checked) => {
              setFieldValue(field.name, checked ? value : "");
            }}
            value={value}
            {...otherField}
            disabled={form.isSubmitting}
          />
        }
        {...other}
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

export default InputField;
