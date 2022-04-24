import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AdminUserDetails() {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAdminUserData();
  }, []);

  const [userData, setUserData] = useState([]);
  const getAdminUserData = () => {
    const adminuserid = localStorage.getItem("adminuserid");
    axios
      .get(` https://mernstack121.herokuapp.com/adminuserdetails/${adminuserid}`)
      .then((res) => {
        console.log(res);
        setUserData([res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container>
        <h1>User Details</h1>
        {userData.map((el) => (
          <Box
            sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}
            key={el._id}
          >
            <Box sx={{ width: "95%" }}>
              <h3
                style={{
                  fontSize: "30px",
                  margin: "5px",
                  padding: "0px",
                  marginBottom: "10px",
                }}
              >
               Name:- {el.userid[0].username}
              </h3>
              <p
                style={{
                  fontSize: "30px",
                  margin: "0px",
                  padding: "5px",
                  fontWeight: "600",
                }}
              >
                Email :- {el.userid[0].email}
              </p>
              <p
                style={{
                  fontSize: "30px",
                  margin: "0px",
                  padding: "5px",
                  fontWeight: "600",
                }}
              >
                Phone :- {el.userid[0].phone}
              </p>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
                   
                </Box>
                
              </TabContext>
            </Box>
          </Box>
        ))}
      </Container>
    </>
  );
}