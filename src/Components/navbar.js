import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOutAction } from "../redux/slice/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOutAction());
    localStorage.setItem("token", "");
    history.push("/login");
  };
  return (
    <div className="w-full justify lg:justify-evenly items-center flex  shadow-md bg-blue-100">
      <Link to="/dashboard" className="text-lg mx-2 font-semibold">
        Dashboard
      </Link>
      <div className=" flex w-full lg:w-4/12 items-center justify-center">
        <span>Welcome</span>
        <span className="text-xl mx-2 font-bold capitalize">{user?.name}</span>
        <Link
          to="/postjob"
          className="bg-blue-500 rounded-md  p-2 m-4 text-white"
        >
          Post Job
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 rounded-md p-2 m-4 text-white"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
