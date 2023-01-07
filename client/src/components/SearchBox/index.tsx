import React, { useState } from "react";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import { fetchProductsByNameThunk } from "../../services/thunks.services";
import { AppDispatch } from "../../redux/store";
import { resetFilteredItems } from "redux/slices/productsSlice";
import { themePalette } from "components/ThemeProvider";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#009688",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#009688",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#b2dfdb",
    },
    "&:hover fieldset": {
      borderColor: "#009688",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#80cbc4",
    },
  },
});

export default function SearchBox() {
  const dispatch = useDispatch<AppDispatch>();

  const [searchValue, setSearchValue] = useState("");
  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    dispatch(fetchProductsByNameThunk(searchValue));
  };

  const handleReset = () => {
    dispatch(resetFilteredItems());
    setSearchValue("");
  };

  return (
    <ThemeProvider theme={themePalette}>
      <Box
        component='form'
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}>
        <CssTextField
          fullWidth
          label='Search candy'
          id='search-value-input'
          type='text'
          value={searchValue}
          onChange={handleChangeSearchValue}
          inputProps={{ "aria-label": "search candy" }}
          sx={{ ml: 1, flex: 1, minWidth: 280 }}
        />

        <IconButton
          type='button'
          sx={{ p: "10px" }}
          aria-label='search'
          onClick={handleClick}>
          <SearchIcon color='secondary' />
        </IconButton>
        <Button color='secondary' onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </ThemeProvider>
  );
}
