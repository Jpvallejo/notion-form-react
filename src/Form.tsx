import {
  Button,
  Typography,
  Divider,
  SelectChangeEvent,
  Stack,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FlatSelect } from "./form-components/FlatSelect";
import MultipleSelect from "./form-components/MultipleSelect";
import { CurrencyInput } from "./form-components/CurrencyInput";

const defaultValues = {
  monto: "",
  concepto: "",
  mes: [] as string[],
  tarjeta: "",
  moneda: "ARS",
};

export const Form = () => {
  const [data, setData] = useState(defaultValues);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setSubmitted(false);
  };

  useEffect(() => {
    const today = new Date(2000, new Date().getMonth() + 1, 1);

    // Getting full month name (e.g. "June")
    const month = today.toLocaleString("es-ES", { month: "long" });
    const currentMonth = month.charAt(0).toUpperCase() + month.slice(1);
    setData({
      ...data,
      mes: [currentMonth],
    });
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setData({
      ...data,
      mes: typeof value === "string" ? value.split(",") : value,
    });
  };
  const currencyOptions = [
    {
      label: "ARS",
      value: "ARS",
    },
    {
      label: "USD",
      value: "USD",
    },
  ];
  const cardOptions = [
    {
      label: "VISA HSBC",
      value: "VISA HSBC",
    },
    {
      label: "MC HSBC",
      value: "MC HSBC",
    },
    {
      label: "AMEX",
      value: "AMEX",
    },
    {
      label: "VISA ICBC",
      value: "VISA ICBC",
    },
  ];
  const monthOptions = [
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const onSubmit = () => {
    setSubmitted(true);
    console.log(data)};

  return (
    <Stack alignItems={"left"} padding={20} spacing={2}>
      <Typography variant="h2"> Spendings Tracker 2023 </Typography>

      <Typography variant="h6">Concepto</Typography>
      <TextField
        placeholder="Concepto"
        variant="outlined"
        style={{ width: 250, minHeight: 50 }}
        sx={{
          ".MuiInputBase-input": {
            padding: "16.5px 14px;",
          },
        }}
        value={data.concepto}
        onChange={(e) => setData({ ...data, concepto: e.target.value })}
      />
      <Typography variant="h6">Monto</Typography>
      <Box sx={{ display: "flex" }}>
        <CurrencyInput
          value={data.monto}
          handleChange={(monto: string) => {
            setData({ ...data, monto: monto });
          }}
        />
        <FlatSelect
          options={currencyOptions}
          direction="row"
          style={{}}
          onClick={(newOption) => {
            setData({ ...data, moneda: newOption });
          }}
          selectedOption={data.moneda}
        />
      </Box>
      <Divider />
      <Typography variant="h6">Tarjeta</Typography>
      <FlatSelect
        options={cardOptions}
        style={{ width: 250 }}
        onClick={(newOption) => {
          setData({ ...data, tarjeta: newOption });
        }}
        selectedOption={data.tarjeta}
      />
      <MultipleSelect
        options={monthOptions}
        handleChange={handleChange}
        selected={data.mes}
      />

      <Divider />
      <Button onClick={onSubmit} variant={"contained"}>
        Submit
      </Button>
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Stack>
  );
};
