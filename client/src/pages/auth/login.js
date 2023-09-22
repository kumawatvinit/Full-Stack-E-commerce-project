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
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import customAxios from "./customAxios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useRedirect } from "../../context/redir";

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [redir, setRedir] = useRedirect();

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await customAxios.post(`/api/v1/auth/login`, {
        email,
        password,
      });

      // console.log(res);

      if (res.data.success) {
        // toast.success("Login successful.");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          })
        );

        setRedir({
          ...redir,
          msg: "Login successful",
        });
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout title={"Login - ShopSpot"} applyBackground={true}>
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
              maxWidth: "450px",
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
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </div>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot-password" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
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
