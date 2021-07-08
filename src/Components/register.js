import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import InputComponent from "./inputComponent";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const styling =
  "flex flex-col lg:flex-row lg:w-full justify-around lg:items-start h-56 lg:h-32 ";

const Register = () => {
  const { token } = useSelector((state) => state.user);
  const history = useHistory();
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    values,
    resetForm,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      skills: "",
      userRole: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name to continue"),
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
      confirmPassword: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
          "Inavlid Password"
        )
        .oneOf([Yup.ref("password"), null], "Your Password Doesn't match")
        .required("Fill this field to continue"),
      skills: Yup.string().required("Add skills to continue"),
      userRole: Yup.number().required("Enter a role"),
    }),
    onSubmit: async (values) => {
      try {
        const resp = await axiosClient.post("/auth/register", values);
        toast("Regsitered Successfully", { type: "success" });
        history.push("/login");
        resetForm();
      } catch (error) {
        toast(error.response.data.message, { type: "error" });
      }
    },
  });

  useEffect(() => {
    if (token) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(0deg, #bfdbfe 50%,  #1a202c 50%)",
      }}
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <span className="text-3xl font-semibold m-4 text-white">Register</span>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 flex flex-col w-4/6 lg:w-2/6 justify-center lg:p-4 items-center rounded-lg shadow-xl"
      >
        <div
          className={
            "flex flex-col lg:flex-row lg:w-full justify-around lg:items-start h-56 lg:h-32 "
          }
        >
          <InputComponent
            value={values.name}
            error={errors.name}
            placeholder={"Enter Name"}
            hanldeChange={handleChange("name")}
            name={"Name"}
            onBlur={handleBlur("name")}
            touched={touched.name}
            type={"text"}
            styling={
              "p-2 lg:p-3 w-full lg:w-48 rounded-xl outline-none shadow-md"
            }
          />
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
              "p-2 lg:p-3 w-full lg:w-96 rounded-xl outline-none shadow-md"
            }
          />
        </div>
        <div
          className={
            "flex flex-col lg:flex-row  lg:w-full justify-start items-center px-2 lg:items-start h-24 lg:h-32 "
          }
        >
          <InputComponent
            value={values.skills}
            error={errors.skills}
            placeholder={"Enter Skills"}
            hanldeChange={handleChange("skills")}
            name={"Skills"}
            onBlur={handleBlur("skills")}
            touched={touched.skills}
            type={"text"}
            styling={
              "p-2 lg:p-3 w-full lg:w-96 rounded-xl outline-none shadow-md"
            }
          />
        </div>
        <div
          className={
            "flex flex-col lg:flex-row lg:w-full justify-center items-center  lg:justify-around lg:items-start h-56 lg:h-32 "
          }
        >
          <InputComponent
            value={values.password}
            error={errors.password}
            placeholder={"Enter Password"}
            hanldeChange={handleChange("password")}
            name={"Password"}
            onBlur={handleBlur("password")}
            touched={touched.password}
            styling={
              "p-2 lg:p-3 w-full lg:w-72 rounded-xl outline-none shadow-md"
            }
            type={"password"}
          />
          <InputComponent
            value={values.confirmPassword}
            error={errors.confirmPassword}
            placeholder={"Confirm Password"}
            hanldeChange={handleChange("confirmPassword")}
            name={"Confirm Password"}
            onBlur={handleBlur("confirmPassword")}
            touched={touched.confirmPassword}
            type={"password"}
            styling={
              "p-2 lg:p-3 w-full lg:w-72 rounded-xl outline-none shadow-md"
            }
          />
        </div>
        <button
          className="outline-none p-3 w-40 my-2 text-white rounded-md bg-blue-400 shadow-xl"
          type="submit"
        >
          Register
        </button>
        <Link to="/login" className="text-blue-500">
          Already Have an Account ?
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
