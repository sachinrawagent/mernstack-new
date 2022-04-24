import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const LoginFirst = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            mx: 3,
            px: 6,
          }}
          onClick={() => navigate("/register")}
        >
          SignUp/SignIn Required
        </Button>
      </div>
    </>
  );
};

export default LoginFirst;