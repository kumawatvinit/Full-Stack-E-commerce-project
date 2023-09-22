import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/layout/layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import customAxios from "./customAxios";
import { useRedirect } from "../../context/redir";

const defaultTheme = createTheme();

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [redir, setRedir] = useRedirect();

  // toast msg will be displayed after the component has rendered
  // and the state has been updated.
  // This should ensure that the toast msg shows up properly when the user is redirected
  useEffect(() => {
    if (redir.msg) {
      toast.success(redir.msg);
      setRedir({
        ...redir,
        msg: "",
      });
    }
  }, [redir, setRedir]);

  // navigate is a hook
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = firstName + " " + lastName;

    try {
      const res = await customAxios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      // console.log(res);

      if (res.data.success) {
        setRedir({
          ...redir,
          msg: "Registration successful. Please login.",
        });
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout title={"Register - ShopSpot"} applyBackground={true}>
      <ThemeProvider theme={defaultTheme}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={2}
            square
            sx={{
              maxWidth: "500px",
              minWidth: "300px",
              marginTop: "5rem",
              marginBottom: "5rem",
              marginLeft: "2rem",
              marginRight: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #000000",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={firstName}
                      onChange={(evnt) => setFirstName(evnt.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(evnt) => setLastName(evnt.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(evnt) => setEmail(evnt.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(evnt) => setPassword(evnt.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      label="Mobile no."
                      name="phone"
                      autoComplete="phone"
                      value={phone}
                      onChange={(evnt) => setPhone(evnt.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="address"
                      value={address}
                      onChange={(evnt) => setAddress(evnt.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontFamily: "sans-serif",
                    }}
                  >
                    What's your lucky number?
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="answer"
                      label="Security Answer, make sure you remember!"
                      name="answer"
                      autoComplete="answer"
                      value={answer}
                      onChange={(evnt) => setAnswer(evnt.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </div>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
}
