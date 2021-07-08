import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import axiosClient from "../axiosClient";
import { logInAction } from "../redux/slice/userSlice";
import InputComponent from "./inputComponent";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    errors,
    values,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invaild Email Address")
        .required("Enter Email to continue"),
      password: Yup.string()
        .matches(
          /(?=.*[a-z])/,
          "Your password must contain atleast 1 lower case characters"
        )
        .matches(
          /(?=.*[A-Z])/,
          "Your password must contain atleast 1 upper characters"
        )
        .matches(/(?=.*\d)/, "Your Password Must Contain atleast 1 digit")
        .min(8, "Your password can't be smaller than 8 characters")
        .max(20, "Your password can't be greater than 20 characters")
        .required("Your password Can't be Empty"),
    }),
    onSubmit: async (values) => {
      try {
        const resp = await axiosClient.post("/auth/login", values);
        dispatch(
          logInAction({
            name: resp.data.data.name,
            email: resp.data.data.email,
            token: resp.data.data.token,
          })
        );
        resetForm();
        history.push("/dashboard");
      } catch (error) {
        toast(error.response.data.message, { type: "error" });
      }
    },
  });

  useEffect(() => {
    if (user.token) history.push("/dashboard");
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(0deg, #bfdbfe 50%,  #1a202c 50%)",
      }}
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <span className="text-3xl font-semibold m-4 text-white">Log In</span>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 flex flex-col lg:w-1/4 p-8 justify-center items-center rounded-lg shadow-xl"
      >
        <div className={"flex flex-col justify-around lg:items-start  "}>
          <InputComponent
            value={values.email}
            error={errors.email}
            placeholder={"Enter Email"}
            hanldeChange={handleChange("email")}
            name={"Email"}
            onBlur={handleBlur("email")}
            touched={touched.email}
            type={"email"}
            styling={
              "p-2 lg:p-3 lg:w-96 w-full rounded-xl outline-none shadow-md"
            }
          />
          <InputComponent
            value={values.password}
            error={errors.password}
            placeholder={"Enter Password"}
            hanldeChange={handleChange("password")}
            name={"Password"}
            onBlur={handleBlur("password")}
            touched={touched.password}
            type={"password"}
            styling={
              "p-2 lg:p-3 w-full lg:w-96 rounded-xl outline-none shadow-md"
            }
          />
          <Link to="/gettoken" className="text-blue-300">
            Forgot Your Password?
          </Link>
        </div>
        <button
          className="outline-none p-3 w-40 my-2 text-white rounded-md bg-blue-400 shadow-xl"
          type="submit"
        >
          Log In
        </button>
        <Link to="/" className="text-blue-500">
          New User?
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
