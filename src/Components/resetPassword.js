import React, { useContext } from "react";
import { TokenContext } from "../Context/tokenContext";

import { useFormik } from "formik";
import * as Yup from "yup";
import InputComponent from "./inputComponent";
import { useHistory } from "react-router-dom";

import axiosClient from "../axiosClient";
import { toast, ToastContainer } from "react-toastify";
const ResetPassword = () => {
  const { token } = useContext(TokenContext);
  const history = useHistory();
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
      confirmPassword: "",
      password: "",
    },
    validationSchema: Yup.object({
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
    confirmPassword: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
        "Inavlid Password"
      )
      .oneOf([Yup.ref("password"), null], "Your Password Doesn't match")
      .required("Fill this field to continue"),
    onSubmit: async (values) => {
      try {
        const resp = await axiosClient.post("/auth/resetpassword", {
          ...values,
          token,
        });
        toast("Your Password has been updated Successfully");
        history.push("/login");
      } catch (error) {
        toast(error.response.data.message, { type: "error" });
      }
    },
  });

  return (
    <div
      style={{
        background: "linear-gradient(0deg, #bfdbfe 50%,  #1a202c 50%)",
      }}
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <span className="text-3xl font-semibold m-4 text-white">
        Update Password
      </span>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 flex flex-col w-1/4 h-2/6 p-8 justify-center items-center rounded-lg shadow-xl"
      >
        <div
          className={"flex flex-col lg:w-full justify-around lg:items-start  "}
        >
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
          <InputComponent
            value={values.confirmPassword}
            error={errors.confirmPassword}
            placeholder={"Confirm Password"}
            hanldeChange={handleChange("confirmPassword")}
            name={"Confirm"}
            onBlur={handleBlur("confirmPassword")}
            touched={touched.confirmPassword}
            type={"password"}
            styling={
              "p-2 lg:p-3 w-full lg:w-96 rounded-xl outline-none shadow-md"
            }
          />
        </div>
        <button
          className="outline-none p-3 w-40 my-2 text-white rounded-md bg-blue-400 shadow-xl"
          type="submit"
        >
          Update Password
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default ResetPassword;
