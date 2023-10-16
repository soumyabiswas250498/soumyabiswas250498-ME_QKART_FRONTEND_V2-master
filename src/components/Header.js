import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { Children } from "react";
import { useHistory, Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons, debounceSearch }) => {
  const [user, setUser] = useState("");
  const history = useHistory();

  useEffect(() => {
    setUser(localStorage.getItem("username"));
  }, []);
  const logout = () => {
    localStorage.clear();
  };
  // console.log(Children.toArray(children));
  return (
    <Box className="header">
      <Link to='/'>
        <Box className="header-title">
          <img src="logo_light.svg" alt={user}></img>
        </Box>
      </Link>
      {user ? (
        <Stack direction="row-reverse" sx={{ width: 1 }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%)",
              width: "300px",
            }}
            className="search-desktop"
          >
            <TextField
              className="serch1"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
              placeholder="Search for items/categories"
              name="search"
              onChange={(e) => {
                debounceSearch(e, 500);
              }}
            />
          </div>

          <div className="header-menu">
            <Avatar alt="User avatar" src="avatar.png" />
            <p>{user}</p>
            <Button
              className="explore-button"
              variant="text"
              onClick={() => {
                history.push("/login");
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        </Stack>
      ) : hasHiddenAuthButtons ? (
        <div className="header-menu">
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => {
              history.push("/");
            }}
          >
            Back to explore
          </Button>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </Box>
  );
};

export default Header;
