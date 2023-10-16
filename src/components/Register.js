import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({});
  const [loader, setLoader] = useState(false);
  const history = useHistory()

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    try {
      setLoader(true);
      // console.log(formData);
      const response = await axios.post(
        `${config.endpoint}/auth/register`,
        formData
      );
      // console.log(res);

      if (response.status === 201) {
        enqueueSnackbar("Registration success !", {
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        enqueueSnackbar("Username is already taken", {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      // console.log(error.response.data)
    } finally {
      setLoader(false);
      (() => history.push("/login"))();
    }
  };
  // console.log(`${config.endpoint}/auth/register`);

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (formData) => {
    //  console.log(formData);
    let state1 = 0,
      state2 = 0,
      state3 = 0;
    if (!formData.username) {
      enqueueSnackbar("Username is a required field!", {
        variant: "warning",
      });
    } else if (formData.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
    } else {
      state1 = 1;
    }
    if (!formData.password) {
      enqueueSnackbar("Password is a required field!", {
        variant: "warning",
      });
    } else if (formData.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
    } else {
      state2 = 1;
    }
    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("Password and confirm password do not match", {
        variant: "warning",
      });
    } else {
      state3 = 1;
    }
    if (state1 * state2 * state3 === 1) {
      return true;
    } else {
      return false;
    }
  };
  const handleInput = (key, input) => {
    setFormData({ ...formData, [key]: input });
  };
  const handleResgistration = (formData) => {
    const validation = validateInput(formData);
    if (validation) {
      register({ username: formData.username, password: formData.password });
    }
    // console.log(validation);
  };
  // console.log(formData);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <form>
          <Stack spacing={2} className="form">
            <h2 className="title">Register</h2>

            <TextField
              id="username"
              label="Username"
              variant="outlined"
              title="Username"
              name="username"
              placeholder="Enter Username"
              fullWidth
              onChange={(e) => handleInput("username", e.target.value)}
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              helperText="Password must be atleast 6 characters length"
              fullWidth
              placeholder="Enter a password with minimum 6 characters"
              onChange={(e) => handleInput("password", e.target.value)}
            />
            <TextField
              id="confirmPassword"
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              onChange={(e) => handleInput("confirmPassword", e.target.value)}
            />
            {loader ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                className="button"
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  handleResgistration(formData);
                }}
              >
                Register Now
              </Button>
            )}

            <p className="secondary-action">
              Already have an account?
              <Link className="link" to="/login">
                Login here
              </Link>
            </p>
          </Stack>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
