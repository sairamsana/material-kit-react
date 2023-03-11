import React from "react";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const InputSelectField = ({
  placeholder,
  field,
  form,
  children,
  options,
  itemKeys,
  onValueChange,
  notValue,
  ...other
}) => {
  const { value, onChange, ...otherField } = field;
  const itemKeysFinal = {
    value: "id",
    title: "name",
    ...(itemKeys || {})
  };
  return (
    <TextField
      placeholder={placeholder}
      {...otherField}
      {...other}
      value={
        typeof value === "string" ? value : (value && value.toString()) || ""
      }
      onChange={e => {
        onChange(e);
        if (onValueChange) onValueChange(e, e.target.value);
      }}
      disabled={form.isSubmitting}
      error={
        !!(form.touched &&
          form.touched[field.name] &&
          form.errors &&
          form.errors[field.name])
      }
      helperText={
        form.touched &&
        form.touched[field.name] &&
        form.errors &&
        form.errors[field.name]
      }
      select
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {options.map((option, i) => (notValue && option[itemKeysFinal.value] !== notValue) ||
        !notValue ? (
        <MenuItem value={option[itemKeysFinal.value]} key={i}>
          {option[itemKeysFinal.title]}
        </MenuItem>
      ) : null)}
    </TextField>
  );
};

export default InputSelectField;
