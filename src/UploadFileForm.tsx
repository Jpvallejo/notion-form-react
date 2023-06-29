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
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MuiFileInput } from "mui-file-input";
import axios from "axios";
import { categories, monthOptions, useYears } from "./consts/MonthOptions";

interface ValuesTypes {
  file: File | null;
  mes: string;
  year: string;
  category: string;
}

const defaultValues: ValuesTypes = {
  file: null,
  mes: "",
  year: "",
  category: "Alquiler",
};

export const UploadFileForm = () => {
  const [data, setData] = useState(defaultValues);
  const [submitted, setSubmitted] = useState(false);
  const years = useYears();
  const [error, setError] = useState({
    file: false,
    year: false,
    mes: false,
    category: false,
  });

  const handleClose = () => {
    setSubmitted(false);
  };

  const setInitialData = (newData: any) => {
    const today = new Date(2000, new Date().getMonth(), 1);
    const month = today.toLocaleString("es-ES", { month: "long" });
    const currentMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const currentYear = new Date().getFullYear();
    setData({
      ...newData,
      mes: currentMonth,
      year: currentYear,
    });
  };

  useEffect(() => {
    setInitialData(data);
  }, []);

  const onChangeMonth = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setData({
      ...data,
      mes: value,
    });
    setError({ ...error, mes: false });
  };
  const onChangeYear = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setData({
      ...data,
      year: value,
    });
    setError({ ...error, year: false });
  };
  const onChangeCategory = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setData({
      ...data,
      category: value,
    });
    setError({ ...error, category: false });
  };
  const onFileChange = (value: File | null) => {
    setData({
      ...data,
      file: value,
    });
    setError({ ...error, year: false });
  };
  const onSubmit = () => {
    const formData: any = new FormData();
    formData.append("file", data.file);
    if (!data.mes || !data.year || !data.file) {
      setError({
        file: !data.file,
        year: !data.year,
        mes: !data.mes,
        category: !data.category,
      });
      return;
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL ?? ""}upload/${
            data.category
          }?year=${data.year}&month=${data.mes}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function (response) {
          setSubmitted(true);
          setInitialData(defaultValues);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Grid alignItems={"left"} padding={5} container={true} spacing={2}>
      <Grid item xs={12}>
        <Typography sx={{ typography: { sm: "h3", xs: "h6" } }}>
          {" "}
          Subir Comprobante a Drive{" "}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">File</Typography>
        <MuiFileInput
          value={data.file}
          onChange={onFileChange}
          itemType="application/pdf"
        />
      </Grid>{" "}
      <Grid item xs={12}>
        <Typography variant="h6">Category</Typography>
        <Select
          value={data.category}
          label="Category"
          onChange={onChangeCategory}
        >
          {categories &&
            categories.map((category) => {
              return <MenuItem key={category} value={category}>{category}</MenuItem>;
            })}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Mes</Typography>
        <Select value={data.mes} label="Year" onChange={onChangeMonth}>
          {monthOptions &&
            monthOptions.map((month) => {
              return (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              );
            })}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Year</Typography>
        <Select value={data.year} label="Year" onChange={onChangeYear}>
          {years &&
            years.map((year) => {
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
        </Select>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Button onClick={onSubmit} variant={"contained"}>
          Submit
        </Button>
      </Grid>
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
    </Grid>
  );
};
