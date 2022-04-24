import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, adminLogin, userImage } from "../Redux/Login/action";
import { setProducts } from "../Redux/DataApi/action";

const Navbar = () => {
  const dispatch = useDispatch();

  const token = useSelector((store) => store.LogInReducer.token);
  const admin = useSelector((store) => store.adminReducer.admin);
   
  const localStorageToken = localStorage.getItem("token");
  dispatch(userLogin(localStorageToken));
  const localStorageAdmin = localStorage.getItem("admin");
  dispatch(adminLogin(localStorageAdmin));
 

  const navigate = useNavigate();

 

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [city, setCity] = useState("");
  const handleSubmitCity = (e) => {
    e.preventDefault();
    axios
      .get(`https://mernstack121.herokuapp.com/getpetbycity/${city}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setProducts(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    dispatch(userLogin({}));
    localStorage.setItem("token", "");
    localStorage.setItem("admin", "");
    localStorage.setItem("user_id", "");
    localStorage.setItem("user_image", "");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{backgroundColor:"darkviolet"}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Pet Shop
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={() => navigate("/")}>
                  Home
                </Typography>
                <Typography textAlign="center">CreatePetShop</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            onClick={() => navigate("/")}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/")}
              sx={{ my: 2,ml:3, color: "white", display: "block" }}
            >
              Home
            </Button>

            {admin ? (
              <Button
                sx={{ my: 2,ml:3, color: "white", display: "block" }}
                onClick={() => navigate("/createpetdetails")}
              >
               Add New Shop
              </Button>
            ) : (
              ""
            )}

            {admin ? (
              <Button
                sx={{ my: 2,ml:3, color: "white", display: "block" }}
                onClick={() => navigate("/allpetstatus")}
              >
                Check Orders
              </Button>
            ) : (
              ""
            )}
            {token ? (
              <Button
                sx={{ my: 2,ml:3, color: "white", display: "block" }}
                onClick={() => navigate("/petstatus")}
              >
               Status
              </Button>
            ) : (
              ""
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 3 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => navigate("/login")}
                  sx={{ padding: "2px" }}
                >
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={!token ? handleSignup : handleLogout}
                  sx={{ padding: "2px" }}
                >
                  {!token ? "Login" : "Logout"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;