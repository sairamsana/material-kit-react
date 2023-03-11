import { DatePicker } from "@mui/lab";
import React from "react";

const InputDateField = ({
  placeholder,
  field,
  form,
  children,
  format,
  label,
  ...other
}) => {
  const { onChange, ...fieledOther } = field;
  return (
    <>
      <DatePicker
        disableToolbar
        placeholder={placeholder}
        // variant="inline"
        format={format || "YYYY-MM-DD"}
        // margin="normal"
        // id="date-picker-inline"
        label={label || "change Date"}
        {...fieledOther}
        // value={value || ""}
        {...other}
        // inputValue={fieledOther.value}
        // value={fieledOther.value}
        InputLabelProps={{
          shrink: !!field.value,
        }}
        disabled={other.disabled || form.isSubmitting}
        onChange={(e, date) => {
          form.setFieldValue(field.name, date);
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
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
      />
    </>
  );
};

export default InputDateField;
