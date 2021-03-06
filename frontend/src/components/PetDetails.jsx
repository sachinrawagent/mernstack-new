import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { selectProducts } from "../Redux/DataApi/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PetDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTableData = useSelector(
    (store) => store.getDataReducer.selectedProduct
  );
  console.log(getTableData);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getpetdata();
  }, []);

  const [img, setImg] = useState({});
  const getpetdata = () => {
    const petid = localStorage.getItem("pets_id");
    axios
      .get(`https://mernstack121.herokuapp.com/getpetshopbyid/${petid}`)
      .then((res) => {
        setImg(res.data);
        dispatch(selectProducts([res.data]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
          <Box sx={{ width: "80%" }}>
            <h3
              style={{
                fontSize: "26px",
                margin: "0px",
                padding: "0px",
                marginBottom: "10px",
              }}
            >
              About Us
            </h3>
            <p
              style={{
                fontSize: "41px",
                margin: "0px",
                padding: "0px",
                fontWeight: "600",
                color:"green"
              }}
            >
              WE KEEP YOUR PETS HAPPY ALL TIME
            </p>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Our Mission" value="1" sx={{ mr: 30, ml: 5 }} />
                  <Tab label="Book A Slot " value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ fontSize: "20px" }}>
                Saving one dog will not change the world, but surely for that
                one dog, the world will change forever.
              </TabPanel>
              <TabPanel value="2" sx={{ fontSize: "20px" }}>
                <Button onClick={() => navigate("/createuserpet")}>
                  Book Now
                </Button>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>

        {getTableData.map((el) => (
          <Box sx={{ mt: 5 }} key={el._id}>
            <h3
              style={{
                textAlign: "center",
                fontSize: "24px",
                marginTop: "50px",
                color:"red"
              }}
            >
              Services We Provide
            </h3>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  Number of pets that will be watched at one time
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {el.petshopdetails[0].petwatch}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  Accepted Pet Types
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {" "}
                    {el.petshopdetails[0].pettypes}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  Accepted Pet size
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {el.petshopdetails[0].petsize}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  Level of adult supervision
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {el.petshopdetails[0].supervision}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  The place your pet will sleep at night
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {el.petshopdetails[0].sleep}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  The number of potty breaks provided per day
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {el.petshopdetails[0].pottybreaks}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  The number of walks provided per day
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {el.petshopdetails[0].walks}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  The type of home I stay in
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {el.petshopdetails[0].hometype}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  My outdoor area size
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {el.petshopdetails[0].outdoorsize}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ p: 2 }}>
                  Emergency transport
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      paddingTop: "10px",
                    }}
                  >
                    {el.petshopdetails[0].emergencytransport}
                  </p>
                </Item>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Container>
    </>
  );
}