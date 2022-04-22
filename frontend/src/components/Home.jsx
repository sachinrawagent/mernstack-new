import React from "react";
import ShowTable from "./ShowTable";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../Redux/Login/action";
const Home = () => {
  const token = useSelector((store) => store.LogInReducer.token);
  const dispatch = useDispatch();

  const localStorageToken = localStorage.getItem("token");
  dispatch(userLogin(localStorageToken));
  return (
    <>
      {!token ? <h2>SIGNUP /SIGNIN REQUIRED</h2> : <ShowTable />}
    </>
  );
};

export default Home;
