import { alpha, styled, TextField } from "@mui/material";

const InputField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",

    borderRadius: 4,
    backgroundColor: theme.palette.type === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
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
