import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../axiosClient";
import { TokenContext } from "../Context/tokenContext";

const GetResetToken = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const { setToken } = useContext(TokenContext);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosClient.get("/auth/resetpassword", {
        params: {
          email: email,
        },
      });
      setToken(result?.data.data.token);
      history.push("/resetpassword");
    } catch (error) {
      toast(error.response.data.message, { type: "warning" });
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(0deg, #bfdbfe 50%,  #1a202c 50%)",
      }}
      className="h-screen flex flex-col justify-center items-center"
    >
      <span className="text-xl text-white font-semibold m-4">
        Get Reset Token
      </span>

      <form
        onSubmit={handleSubmit}
        className="w-1/6 p-3 bg-gray-200 flex flex-col rounded-lg "
      >
        <div className="flex flex-col justify-start">
          <span className="text-xl font-semibold">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={handleChange}
            className="p-3 rounded-md shadow-md my-4"
          />

          <button
            className="outline-none bg-blue-400 p-3 text-white rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetResetToken;
