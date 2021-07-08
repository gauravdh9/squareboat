import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axiosClient from "../axiosClient";

const initialValue = {
  title: "",
  location: "",
  description: "",
};

const PostJob = () => {
  const { token } = useSelector((state) => state.user);
  const [values, setValues] = useState(initialValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosClient.post("/jobs", values, {
        headers: { Authorization: token },
      });
      console.log(resp);
      toast("Job Posted Successfully", { type: "success" });
      setValues({ title: "", description: "", location: "" });
    } catch (error) {
      toast(error.response.data.message, { type: "warning" });
    }
  };

  return (
    <div
      style={{
        height: "870px",
        background: "linear-gradient(0deg, #bfdbfe 50%,  #1a202c 50%)",
      }}
      className="flex justify-center flex-col w-full items-center relative"
    >
      <div className="text-3xl font-bold flex w-3/12 m-4 text-white">
        Post a Job
      </div>
      <form
        className="p-4 flex flex-col shadow-xl justify-center w-1/4 items-center bg-gray-200 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="p-4 w-full flex flex-col justify-center  items-start">
          <span className="px-2 text-xl font-semibold">Title</span>
          <input
            value={values.title}
            type="text"
            name={"title"}
            placeholder="Job Title"
            onChange={handleChange}
            className="outline-none p-3 rounded-xl w-full shadow-md"
          />
        </div>
        <div className="p-4 w-full flex flex-col justify-center items-start">
          <span className="px-2 text-xl font-semibold">Description</span>
          <textarea
            value={values.description}
            name={"description"}
            placeholder="Job Description"
            onChange={handleChange}
            className="outline-none p-3 w-full rounded-xl shadow-md h-48"
          />
        </div>
        <div className="p-4 flex w-full flex-col justify-center items-start">
          <span className="px-2 text-xl font-semibold">Location</span>
          <input
            value={values.location}
            type="text"
            name={"location"}
            placeholder="Job Location"
            onChange={handleChange}
            className="outline-none p-3 rounded-xl w-full shadow-md"
          />
        </div>

        <button className="bg-blue-500 text-white rounded-xl p-4 cursor-pointer shadow-xl">
          Post a Job
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default PostJob;
