import {
  Button,
  Typography,
  Divider,
  SelectChangeEvent,
  TextField,
  Box,
  AlertColor,
  Grid,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FlatSelect } from "./form-components/FlatSelect";
import MultipleSelect from "./form-components/MultipleSelect";
import { CurrencyInput } from "./form-components/CurrencyInput";
import axios from "axios";
import LoadingModal from "./components/LoadingModal";
import { currencyOptions, monthOptions, cardOptions, categoryOptions } from "./consts/formConsts";
import { Snackbar } from "./components/Snackbar";

const defaultValues = {
  monto: "",
  concepto: "",
  mes: [] as string[],
  tarjeta: "",
  moneda: "ARS",
  categoria: "Otros"
};

export const Form = () => {
  const [data, setData] = useState(defaultValues);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertText, setAlertText] = useState("");
  const [error, setError] = useState({
    tarjeta: false,
    moneda: false,
    mes: false,
    monto: false,
    concepto: false,
    categoria: false,
  });

  const handleClose = () => {
    setSubmitted(false);
  };

  const setInitialData = (newData: any) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), new Date().getMonth() + 1, 1);
    const month = today.toLocaleString("es-ES", { month: "long" });
    const currentMonth = `${month.charAt(0).toUpperCase() + month.slice(1)}-${(today.getFullYear() % 100)}`;
    setData({
      ...newData,
      mes: [currentMonth],
    });
  }

  useEffect(() => {
    setInitialData(data)
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setData({
      ...data,
      mes: typeof value === "string" ? value.split(",") : value,
    });
    setError({ ...error, mes: false });
  };
  const onSubmit = () => {
    if (
      !data.moneda ||
      !data.tarjeta ||
      !data.mes.length ||
      !data.monto ||
      !data.concepto ||
      !data.categoria
    ) {
      setError({
        moneda: !data.moneda,
        tarjeta: !data.tarjeta,
        mes: !data.mes.length,
        monto: !data.monto,
        concepto: !data.concepto,
        categoria: !data.categoria,
      });
      return;
    } else {
      setIsLoading(true);
      axios
        .post(`${process.env.REACT_APP_BASE_URL ?? ""}creditCards/`, data)
        .then(function (_response: any) {
          setInitialData(defaultValues);
          setSeverity("success");
          setAlertText("Gasto cargado correctamente!")
          setSubmitted(true);
          setIsLoading(false);
        })
        .catch(function (error: any) {
          console.log(error);
          setSeverity("error");
          setAlertText("There was an error")
          setSubmitted(true);
          setIsLoading(false);
        });
    }
  };

  return (
    <Grid alignItems={"left"} padding={5} container={true} spacing={2}>
      <Grid item xs={12}>
        <Typography sx={{ typography: { sm: 'h3', xs: 'h6' } }}> Spendings Tracker 2023 </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Concepto</Typography>
        <TextField
          required={true}
          error={error.concepto}
          label="Concepto"
          variant="outlined"
          style={{ width: 250, minHeight: 50 }}
          sx={{
            ".MuiInputBase-input": {
              padding: "16.5px 14px;",
            },
          }}
          value={data.concepto}
          onChange={(e) => {
            setError({ ...error, concepto: false });
            setData({ ...data, concepto: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Monto</Typography>
        <Box sx={{ display: "flex" }}>
          <CurrencyInput
            value={data.monto}
            error={error.monto}
            handleChange={(monto: string) => {
              setError({ ...error, monto: false });
              setData({ ...data, monto: monto });
            }}
          />
          <FlatSelect
            hasError={error.moneda}
            options={currencyOptions}
            direction="row"
            style={{}}
            onClick={(newOption) => {
              setData({ ...data, moneda: newOption });
              setError({ ...error, moneda: false });
            }}
            selectedOption={data.moneda}
          />
        </Box>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Typography variant="h6">Tarjeta</Typography>
        <FlatSelect
          hasError={error.tarjeta}
          options={cardOptions}
          style={{ width: 250 }}
          onClick={(newOption) => {
            setError({ ...error, tarjeta: false });
            setData({ ...data, tarjeta: newOption });
          }}
          selectedOption={data.tarjeta}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Mes</Typography>
        <MultipleSelect
          options={monthOptions}
          handleChange={handleChange}
          selected={data.mes}
          error={error.mes}
        />
      </Grid>
      <Divider />

      <Grid item xs={12}>
        <Typography variant="h6">Categoria</Typography>
        <FlatSelect
          style={{ width: 250 }}
          options={categoryOptions.map((x) => ({ label: x, value: x }))}
          onClick={(newOption) => {
            setError({ ...error, categoria: false });
            setData({ ...data, categoria: newOption });
          }}
          selectedOption={data.categoria}
          hasError={error.categoria}
        />
      </Grid>
      <Divider />

      <Grid item xs={12}>
        <Button onClick={onSubmit} variant={"contained"}>
          Submit
        </Button>
      </Grid>
      <Snackbar
        open={submitted}
        handleClose={handleClose}
        severity={severity as AlertColor}
        text={alertText}
      />
      <LoadingModal open={isLoading} />
    </Grid>
  );
};
