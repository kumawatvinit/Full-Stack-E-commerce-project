import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MdLockReset from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/layout/layout";
import { toast } from "react-toastify";
import { useState } from "react";
import customAxios from "./customAxios";
import { useNavigate } from "react-router-dom";
import { useRedirect } from "../../context/redir";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [redir, setRedir] = useRedirect();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // console.log(email, password, answer);

      const res = await customAxios.post(`/api/v1/auth/forgot-password`, {
        email,
        password,
        answer,
      });

      // console.log(res);

      if (res.data.success) {
        // toast.success("Forgot password successful.");

        setRedir({
          ...redir,
          msg: "Password update successful",
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
    <Layout title={"Change password"} applyBackground={true}>
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
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <MdLockReset />
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset Password
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  type="email"
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
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontFamily: "sans-serif",
                    marginTop: "1rem",
                  }}
                >
                  What's your lucky number?
                </Grid>
                <TextField
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  id="answer"
                  label="Security Answer"
                  name="answer"
                  autoComplete="answer"
                  onKeyDown={(evnt) => {
                    const allowedKeys = [
                      "0",
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "Backspace",
                    ];
                    if (!allowedKeys.includes(evnt.key)) {
                      evnt.preventDefault();
                    }
                  }}
                  value={answer}
                  onChange={(evnt) => setAnswer(evnt.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Set new password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Change Password
                  </Button>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
}
