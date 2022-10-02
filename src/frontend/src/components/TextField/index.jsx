import { styled, TextField } from "@mui/material";

const InputField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  marginBottom: 10,
  "& .MuiInputBase-root": {
    color: theme.palette.type === "light" ? "#000" : "#fff",
    backgroundColor:
      theme.palette.type === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.08)",
    borderRadius: 5,
  },
  "& label.Mui-error": {
    color: "red",
  },
  "& .MuiFormLabel-root": {
    color: theme.palette.type === "light" ? "rgba(0, 0, 0, 0.38)" : "rgba(255, 255, 255, 0.7)",
  },
  "& label.Mui-focused": {
    color: theme.palette.type === "light" ? "#000" : "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
      color: "#fff",
    },
  },
}));

const CustomTextField = styled((props) => (
  <TextField
    InputProps={{ disableUnderline: true }}
    {...props}
    style={{ marginBottom: 8, color: "#fff" }}
  />
))(({ theme }) => ({
  color: "#fff",
  // border: "1px solid #e2e2e1",
  // // overflow: "hidden",
  borderRadius: 5,
  backgroundColor: theme.palette.type === "light" ? "#fcfcfb" : "#2b2b2b",
  "& input:valid + fieldset": {
    borderColor: theme.palette.primary.type,
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: theme.palette.primary.type,
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important",
    color: "white",
  },
}));

export { InputField, CustomTextField };
