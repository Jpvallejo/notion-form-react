import React from "react";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
type CurrencyInputProps = {
  value: string;
  handleChange: (a: string) => void;
};
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  handleChange,
}) => {
  return (
    <CurrencyTextField
      style={{'width': 250, 'margin-right': 10}}
      label="Amount"
      variant="outlined"
      value={value}
      currencySymbol="$"
      outputFormat="string"
      onChange={(_event: any, value: string) => handleChange(value)}
    />
  );
};
