import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userLocalService } from "../../services/localStorageService";

export default function Register() {
  let [userSignUp, setUserSignUp] = useState({
    userList: [],
    values: {
      ho_ten: "",
      email: "",
      so_dt: "",
      mat_khau: "",
      loai_nguoi_dung: "",
    },
  });

  let navigate = useNavigate();

  let handleChange = (event) => {
    let { name, value } = event.target;

    const newUserSignUp = {
      ...userSignUp.values,
      [name]: value,
    };

    setUserSignUp({
      ...userSignUp,
      values: newUserSignUp,
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

        setUserSignUp({
          ...userSignUp,
          userList: res.data,
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    axios({
      url: "http://localhost:8080/users/signup",
      method: "POST",
      data: {
        ho_ten: userSignUp.values.ho_ten,
        email: userSignUp.values.email,
        so_dt: userSignUp.values.so_dt,
        mat_khau: userSignUp.values.mat_khau,
        loai_nguoi_dung: userSignUp.values.loai_nguoi_dung,
      },
    })
      .then((res) => {
        // alert(res.data);
        userLocalService.set(res.data);
        getUser();
        navigate("/login");
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <form className="container mt-5 w-50" onSubmit={handleSubmit}>
      <h3 className="display-4 ">REGISTER</h3>
      <div className="form-group">
        <p>Name</p>
        <input name="ho_ten" className="form-control" onChange={handleChange} />
      </div>
      <div className="form-group">
        <p>Email</p>
        <input name="email" className="form-control" onChange={handleChange} />
      </div>
      <div className="form-group">
        <p>Phone</p>
        <input name="so_dt" className="form-control" onChange={handleChange} />
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
        <p>Type</p>
        <input
          name="loai_nguoi_dung"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-outline-secondary">Register</button>
      </div>
    </form>
  );
}
