import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import React from "react";
import { useController } from "react-hook-form";

function FormInput(props) {
  const { control, name, errorsMessage, onChange, ...inputProps } = props;
  const {
    field: { ref, ...fieldProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: errorsMessage?.required },
    defaultValue: props.defaultValue,
  });

  if (props.currency) {
    return (
      <CurrencyTextField
        variant="outlined"
        outputFormat="number"
        currencySymbol="R$ "
        inputRef={ref}
        error={Boolean(error)}
        helperText={error?.message}
        decimalCharacter=","
        digitGroupSeparator="."
        onChange={(_event, value) => onChange && onChange(value)}
        {...inputProps}
        inputProps={{
          ...fieldProps,
        }}
      />
    );
  }

  return (
    <TextField
      variant="outlined"
      {...inputProps}
      inputProps={{
        ...fieldProps,
      }}
      inputRef={ref}
      error={Boolean(error)}
      helperText={error?.message}
      onChange={(event) => onChange && onChange(event.target.value)}
    />
  );
}

export default FormInput;
