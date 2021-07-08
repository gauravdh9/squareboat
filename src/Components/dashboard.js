import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axiosClient from "../axiosClient";
import JobComponent from "./jobComponent";

const Dashboard = () => {
  const { token } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await axiosClient("/recruiters/jobs", {
        headers: { Authorization: token },
      });
      setJobs(data.data.data);
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      style={{
        height: "870px",
        background: "linear-gradient(0deg, #bfdbfe 50%,  #1a202c 50%)",
      }}
      className="h-screen relative w-full flex flex-col justify-start items-center p-10"
    >
      <div className="text-3xl font-bold flex w-5/6 m-4 text-white">
        My Jobs
      </div>
      {jobs.length != 0 ? (
        <div className="grid gap-6 lg:grid-cols-4  grid-cols-2">
          {jobs.map((item, index) => (
            <JobComponent {...item} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex h-4/6  justify-center items-center  text-white">
          <span className="text-3xl animate-pulse font-semibold text-white">
            Fetching Data
          </span>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
