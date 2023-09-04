import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_LOGIN } from "../../services/localStorageService";
import "./login.css";
import { NavLink } from "react-router-dom";

export default function Login(props) {
  let [userLogin, setUserLogin] = useState({
    userList: [],
    values: {
      email: "",
      mat_khau: "",
    },
  });

  const validate = () => {
    let result = true;
    if (userLogin.values.email === "" || userLogin.values.email === null) {
      return (result = false);
    }
    if (
      userLogin.values.mat_khau === "" ||
      userLogin.values.mat_khau === null
    ) {
      return (result = false);
    }
    return result;
  };

  let navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem(USER_LOGIN)) {
  //     navigate("/");
  //   }
  // }, []);

  let handleChange = (event) => {
    let { name, value } = event.target;

    const newUserLogin = {
      ...userLogin.values,
      [name]: value,
    };

    setUserLogin({
      ...userLogin,
      values: newUserLogin,
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    axios({
      url: "http://localhost:8080/users/login",
      method: "POST",
      data: {
        email: userLogin.values.email,
        mat_khau: userLogin.values.mat_khau,
      },
    })
      .then((res) => {
        // alert(res.data);
        getUser();

        navigate("/");
        // if (localStorage.getItem(USER_LOGIN)) {
        //   navigate("/");
        // }

        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const getUser = () => {
    let promise = axios({
      url: "http://localhost:8080/users/getListUser",
      method: "GET",
    });
    promise
      .then((res) => {
        console.log(res.data);

        setUserLogin({
          ...userLogin,
          userList: res.data,
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <form className="container mt-5 w-50" onSubmit={handleSubmit}>
      <h3>LOGIN</h3>
      <div className="form-group">
        <p>Email</p>
        <input name="email" className="form-control" onChange={handleChange} />
      </div>
      <div className="form-group">
        <p>Password</p>
        <input
          type="password"
          name="mat_khau"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-outline-secondary">Login</button>
        <NavLink className="register-link ml-2 text-success" to="/register">
          Register
        </NavLink>
      </div>
    </form>
  );
}
