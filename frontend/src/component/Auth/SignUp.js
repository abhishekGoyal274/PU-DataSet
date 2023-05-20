import M from "materialize-css";
import React, { useState } from "react";
import "./Login.css";

const SignUp = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const onClickHandeler = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", Name);
    data.append("email", Email);
    data.append("password", Password);
    try {
      fetch("http://localhost:5000/auth_upload/create_account", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          if (data.error) {
            M.toast({
              html: data.error,
              classes: "#c62828 red darken-3",
            });
          } else {
            M.toast({
              html: data.message,
              classes: "#76ff03 light-green accent-3",
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
    <div class="form-container">
      <form class="register-form">
     <p style={{fontFamily:'Georgia',textAlign:'center',fontSize:'44px'}}>SIGN UP TO CONTINUE</p>
        <input
          type="text"
          class="form-field"
          placeholder="Name"
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          class="form-field"
          placeholder="Email"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          class="form-field"
          placeholder="Password"
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button class="waves-effect waves-light btn center-align white-text text-darken-2 card-panel indigo darken-4  z-depth-1"
          style={{
            fontSize: "20px",
            height: "40px",
            width: "624px",
            background: "midnightblue",
            color: "white",
            cursor: "pointer",
            fontFamily:'Georgia'
          }}
          onClick={(event) => {
            onClickHandeler(event);
          }}
        >
          SIGNUP
        </button>
      </form>
    </div>
  );
};

export default SignUp;
