import React from "react";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
type CurrencyInputProps = {
  value: string;
  handleChange: (a: string) => void;
  error: boolean;
};
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  handleChange,
  error,
}) => {
  return (
    <CurrencyTextField
      error={error}
      style={{ width: 250, marginRight: 10 }}
      label="Amount"
      variant="outlined"
      value={value}
      currencySymbol="$"
      outputFormat="string"
      onChange={(_event: any, value: string) => handleChange(value)}
    />
  );
};
