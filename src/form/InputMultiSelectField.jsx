import React from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from '@mui/system';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledInputLabel = styled(InputLabel)(({theme}) => ({
  label: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    background: theme.palette.background.paper,
  },
}));

const InputMultiSelectField = ({
  label,
  field,
  form,
  children,
  options,
  itemKeys,
  onValueChange,
  notValue,
  className,
  multiple,
  ...other
}) => {
  // const { value, onChange, ...otherField } = field;
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
    <FormControl className={className} {...other} variant="outlined">
      <StyledInputLabel >{label}</StyledInputLabel>
      <Select
        multiple={multiple || false}
        {...field}
        disabled={other.disabled || form.isSubmitting}
        error={errorStatus}
        // input={<Input />}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          const titles = [];
          for (let i = 0; i < selected.length; i += 1) {
            for (let j = 0; j < options.length; j += 1) {
              const element = options[j];
              if (options[j][itemKeysFinal.value] === selected[i]) {
                titles.push(options[j][itemKeysFinal.title]);
              }
            }
          }
          return titles.join(", ");
        }}
      >
        {!multiple && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {options.map((option, i) => (notValue && option[itemKeysFinal.value] !== notValue) ||
          !notValue ? (
          <MenuItem value={option[itemKeysFinal.value]} key={i}>
            <Checkbox
              checked={field.value.indexOf(option[itemKeysFinal.value]) > -1}
            />
            <ListItemText primary={option[itemKeysFinal.title]} />
          </MenuItem>
        ) : null)}
      </Select>
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

export default InputMultiSelectField;
