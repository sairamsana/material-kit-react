import React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

const InputField= ({
  placeholder,
  field,
  form,
  children,
  label,
  className,
  options,
  itemKeys,
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
  const itemKeysFinal = {
    value: "id",
    title: "name",
    ...(itemKeys || {})
  };
  return (
    <FormControl component="fieldset" className={className} error={errorStatus}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...field} row>
        {options.map((option, i) => (
            <FormControlLabel
              disabled={form.isSubmitting}
              control={<Radio />}
              value={option[itemKeysFinal.value]}
              key={i}
              label={option[itemKeysFinal.title]}
            />
          ))}
      </RadioGroup>
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
