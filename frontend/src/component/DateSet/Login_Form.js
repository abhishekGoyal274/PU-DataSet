import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login_Form = () => {
  const navigatee = useNavigate();
  const [UserName, setUserName] = useState("");
  const [PassWord, setPassWord] = useState("");

  const onClickHandeler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userName", UserName);
    data.append("password", PassWord);

    fetch("http://localhost:5000/auth_request/login", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.error) {
          alert(data.error);
        } else {
           navigatee(`/data_set/download/${data.userId}`)
        }
      });
  };

  return (
    <div class="form-container">
      <form class="register-form">
        <input
          type="text"
          class="form-field"
          placeholder="UserName"
          value={UserName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="text"
          // class="form-field"
          placeholder="PassWord"
          value={PassWord}
          onChange={(e) => {
            setPassWord(e.target.value);
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
            fontFamily:'georgia'
          }}
          onClick={(event) => {
            onClickHandeler(event);
          }}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};
