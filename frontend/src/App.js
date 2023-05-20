import React, { createContext, useEffect, useContext, useReducer } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Auth/Login";
import SignUp from "./component/Auth/SignUp";
import DataSet from "./component/DateSet/DataSet";
import Download_Page from "./component/DateSet/Download_Page";
import { Login_Form } from "./component/DateSet/Login_Form";
import RequestForm from "./component/DateSet/RequestForm";
import UploadDataSet from "./component/DateSet/UploadDataSet";
import Home from "./component/Home";
import NavBar from "./component/NavBar";
import { initialState, reducer } from "./component/reducers/userReducer";
import Logo from "./component/Logo";
import Footer from './component/Footer';
export const UserContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: true });
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>,
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/signUp" element={<SignUp />}></Route>
      <Route exact path="/dataSet/:dataId" element={<DataSet />}></Route>
      <Route exact path="/upload_data_set" element={<UploadDataSet />}></Route>
      <Route
        exact
        path="/request_data_set/:dataId"
        element={<RequestForm />}
      ></Route>
      <Route exact path="/data_set/login" element={<Login_Form />}></Route>
      <Route
        exact
        path="/data_set/download/:userId"
        element={<Download_Page />}
      ></Route>
    </Routes>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <NavBar />
        <Logo />
     
        <Routing />
        <Footer />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
