import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../axiosClient";
import { toast, ToastContainer } from "react-toastify";
const JobComponent = ({ title, description, location, id }) => {
  // const id = "0c7d241b-685d-4ed8-9eea-c8216d9f6e34";
  const [candidates, setCandidates] = useState([]);
  const [modal, setModal] = useState(false);
  const { token } = useSelector((state) => state.user);

  const fetchData = async () => {
    try {
      setModal(!modal);
      const result = await axiosClient.get(
        "/recruiters/jobs/" + id + "/candidates",
        {
          headers: { Authorization: token },
        }
      );
      setCandidates(result.data.data);
    } catch (error) {
      toast(error.response.message, { type: "warning" });
    }
  };
  return (
    <div className="flex flex-col justify-center items-start  bg-gray-200 shadow-md p-4 lg:p-8 rounded-xl">
      <div className="flex flex-col justify-center items-start">
        <span className="text-xl font-semibold">Title</span>
        <span className="text-base font-light">{title}</span>
      </div>
      <div className="flex flex-col justify-center items-start">
        <span className="text-xl font-semibold">Description</span>
        <span className="text-base font-light">{description}</span>
      </div>
      <div className="flex flex-col justify-center items-start">
        <span className="text-xl font-semibold">Location</span>
        <span className="text-base font-light">{location}</span>
      </div>
      <div className="flex justify-end w-full">
        <button
          onClick={fetchData}
          className="outline-none bg-blue-200  text-gray-800 shadow rounded-xl p-2 lg:p-3"
        >
          View Applications
        </button>
      </div>

      {modal && (
        <div className="absolute w-full h-full flex flex-col justify-center items-center bg-gray-700 bg-opacity-60  top-0 left-0">
          <div className="flex w-1/4 justify-around items-center m-4">
            <div className="w-full text-3xl font-semibold text-white">
              Candidates
            </div>
            <div>
              <button onClick={() => setModal(!modal)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="36px"
                  viewBox="0 0 24 24"
                  width="36px"
                  fill="#000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-1/4 flex flex-col justify-center items-center rounded-md p-4 bg-gray-300">
            {candidates?.map((item, index) => {
              return (
                <div className="flex flex-col w-full bg-gray-400 p-4 rounded-md">
                  <div className="flex justify-start items-center w-1/2">
                    <span className="text-xl font-semibold">Name</span>
                    <span className="text-base font-light mx-4">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-xl font-semibold">Email</span>
                    <span className="text-base font-light mx-4">
                      {item.email}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-xl font-semibold">Skills</span>
                    <div className="flex w-full justify-start items-center">
                      {item?.skills.split(", ").map((skill, idx) => (
                        <div className="p-2 text-sm bg-blue-200 rounded-full shadow-md mx-4">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default JobComponent;
