import React from "react";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";

const InputField = ({
  placeholder,
  field,
  form,
  children,
  value,
  options,
  itemKeys,
  label,
  onValueChange,
  className,
  ...other
}) => {
  const { value: inputValue, onChange, ...otherField } = field;
  const { setFieldValue } = form;
  const itemKeysFinal = {
    value: "id",
    title: "name",
    ...(itemKeys || {}),
  };
  const errorStatus =
    !!(form.touched &&
      form.touched[field.name] &&
      form.errors &&
      form.errors[field.name]);
  return (
    <FormControl component="fieldset" className={className}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row>
        {options &&
          options.map((option, i) => {
            const optionValue = option[itemKeysFinal.value];
            return (
              <FormControlLabel
                key={i}
                style={{ width: "30%" }} // added for 3 column grid layout
                control={
                  <Checkbox
                    checked={field.value.indexOf(optionValue) > -1}
                    onChange={(e, checked) => {
                      const finalValues = field.value || [];
                      if (checked && finalValues.indexOf(optionValue) === -1) {
                        finalValues.push(optionValue);
                      } else if (
                        !checked &&
                        finalValues.indexOf(optionValue) >= 0
                      ) {
                        finalValues.splice(finalValues.indexOf(optionValue), 1);
                      }
                      setFieldValue(field.name, finalValues);
                      if (onValueChange) onValueChange(e, finalValues);
                    }}
                    value={optionValue}
                    {...otherField}
                    disabled={other.disabled || form.isSubmitting}
                  />
                }
                label={option[itemKeysFinal.title]}
              />
            );
          })}
      </FormGroup>
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
