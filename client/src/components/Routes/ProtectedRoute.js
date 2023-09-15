import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../redux/feautures/auth/authAction";
import API from "../../services/API";
function ProtectedRoute({ children }) {
  const dispatch = useDispatch();

  const getuser = async () => {
    try {
      const { data } = await API.get("/auth/currentuser");
      if (data?.success) {
        dispatch(getCurrentUser(data));
      }
    } catch (error) {
      localStorage.clear();
    }
  };
  useEffect(() => {
    getuser();
  }, []);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return;
    <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
