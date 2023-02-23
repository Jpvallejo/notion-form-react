import React from "react";
import { Stack, Button } from "@mui/material";

type FlatSelectProps = {
  options: { label: string; value: string }[];
  onClick: (arg0: string) => void;
  selectedOption: string;
  style: any;
  direction?: "column" | "row";
  hasError: boolean;
};

export const FlatSelect: React.FC<FlatSelectProps> = ({
  options,
  onClick,
  selectedOption,
  style,
  direction = "column",
  hasError,
}) => {
  return (
    <Stack spacing={2} direction={direction}>
      {options.map((singleOption) => (
        <Button
          color={hasError? "error": "primary"}
          onClick={() => {
            onClick(singleOption.value);
          }}
          key={singleOption.value}
          variant={
            singleOption.value === selectedOption ? "contained" : "outlined"
          }
          style={style}
        >
          {singleOption.label}
        </Button>
      ))}
    </Stack>
  );
};
