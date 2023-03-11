import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React from "react";

const InputAutoField = ({
  placeholder,
  field,
  form,
  children,
  options,
  itemKeys,
  onValueChange,
  onInputChange,
  loading,
  renderOption,
  id,
  ...other
}) => {
  const { value, onChange, ...otherField } = field;
  const itemKeysFinal = {
    value: "id",
    title: "name",
    ...(itemKeys || {}),
  };
  let timerForOnChange;
  return (
    <Autocomplete
      id={id || "default-auto-complete"}
      // freeSolo
      // disableClearable
      getOptionSelected={(option, value) =>
        option[itemKeysFinal.value] === value
      }
      loading={loading}
      disabled={other.disabled || form.isSubmitting}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          for (let i = 0; i < options.length; i += 1) {
            const optionData = options[i];
            if (optionData[itemKeysFinal.value] === option) {
              return optionData[itemKeysFinal.title];
            }
          }
        }
        return option[itemKeysFinal.title];
      }}
      options={options}
      value={value}
      onChange={(e, value, ...other) => {
        form.setFieldValue(
          field.name,
          value ? value[itemKeysFinal.value] : null
        );
        if (onValueChange) onValueChange(e, value ? value[itemKeysFinal.value] : null);
      }}
      onInputChange={(e, value, type) => {
        if (type === "input") {
          if (timerForOnChange) {
            clearTimeout(timerForOnChange);
          }
          timerForOnChange = window.setTimeout(() => {
            if (onInputChange) onInputChange(value);
          }, 1000);
        }
      }}
      defaultValue={null}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          placeholder={placeholder}
          {...otherField}
          {...other}
          {...params}
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
          // inputProps={{
          //   ...params.inputProps,
          //   autoComplete: "new-password" // disable autocomplete and autofill
          // }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default InputAutoField;
