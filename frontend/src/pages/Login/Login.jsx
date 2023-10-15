import React, { useEffect, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { object, string, number, date, InferType } from "yup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  loginError,
  loginStart,
  loginSuccess,
} from "../../components/redux/authSlice";
// import { loginUser } from "../../components/redux/loginUser";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

const Login = () => {

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [dataset, setDataset] = useState("");
  const [errorData, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate("/");

  const loginSchema = yup.object().shape({
    username: yup.string().min(4).max(12).required("Please enter fullname"),
    password: yup.string().min(4).max(12).required("Please enter password"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { user, error, loading, message } = useSelector((state) => state.auth);
  console.log(user?.payload)



  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleLogin = async (e) => {
e.preventDefault()

    try {
      loginUser(credentials, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async (credentials, dispatch) => {
    dispatch(loginStart(credentials));
    try {
      const username = credentials.username;
      const password = credentials.password;

      const res = await axios
        .post(
          "http://localhost:3001/api/auth/login",
          { username, password },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {

          dispatch(loginSuccess({ payload: response.data.details }));

          navigate("/");
          window.location.reload();

        })
        .catch(function (error) {
          // console.log(error);
          dispatch(loginError(error));
          setError(error);
        });
    } catch (error) {
      // setError(error);
    }
  };
  useEffect(() => {

    localStorage.setItem("user", JSON.stringify(user?.payload));
  }, [user?.payload]);


  return (
    // <Formik
    //   initialValues={credentials}
    //   validationSchema={registerSchema}
    //   onSubmit={submitForm}
    // >
    <div className="Login">
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <div className="container">
          <div className="image">
            <img
              src="https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="login form"
              className="img"
            />
          </div>
          <div className="info">
            <h1 style={{ color: "yellow" }}>Vloguider</h1>

            <h5 style={{ letterSpacing: "1px", width: "200px" }}>
              Signin into your account
            </h5>
            <label>Username</label>

            <br />
            <input
              {...register("username")}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="texts"
              id="username"
            />
            <p className="error-text">{errors.username?.message}</p>

            <br />

            <label>Password</label>
            <br />
            <input
              {...register("password")}
              onChange={handleChange}
              type="text"
              placeholder="Enter your password"
              className="texts"
              id="password"
            />
            <p className="error-text">{errors.password?.message}</p>

            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </form>
    </div>
    // </Formik>
  );
};

export default Login;
