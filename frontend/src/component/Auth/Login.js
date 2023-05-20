import M from "materialize-css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./Login.css";

const Login = () => {
  const navigatee = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const onClickHandeler = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("email", Email);
    data.append("password", Password);
    try {
      fetch("http://localhost:5000/auth_upload/login", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);

          if (data.error) {
            M.toast({
              html: data.error,
              classes: "#1a237e indigo darken-4",
            });
          } else {
            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: true });
            navigatee("/");
            M.toast({
              html: "LOGGED IN SUCCESSFULLY",
              classes: "#1a237e indigo darken-4",
            });
          }
        });
    } catch (err) {
      M.toast({
        html: "SERVER ERROR",
        classes: "#c62828 red darken-3",
      });
    }
  };
  return (
    <div>
      <div class="form-container">
        <form class="register-form"></form>

        <h1
          style={{
            textAlign: "center",
            fontFamily: "Georgia",
            fontSize: "44px",
          }}
        >
          LOGIN TO CONTINUE
        </h1>
        <input
          type="text"
          class="form-field"
          placeholder="Email"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br></br>
        <input
          type="text"
          class="form-field"
          placeholder="Password"
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <button class="waves-effect waves-light btn center-align white-text text-darken-2 card-panel indigo darken-4  z-depth-1"
          style={{
            height: "40px",
            marginTop: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            width: "634px",
            background: "midnightblue",
            color: "white",
            cursor: "pointer",
            fontFamily:'Georgia'
          }}
          onClick={(event) => {
            onClickHandeler(event);
          }}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;