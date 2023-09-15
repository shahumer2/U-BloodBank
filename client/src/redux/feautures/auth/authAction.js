import Swal from "sweetalert2";

import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export const userLogin = createAsyncThunk(
  "/auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      // console.log(data, "heyy");

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        window.location.replace("/");
      }
      return data;
    } catch (error) {
      Swal.fire({
        title: "<strong>VALIDATION <u>ERROR</u></strong>",
        icon: "info",
        html: <b>`{error.response.data.message}` </b>,

        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i className="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: "Thumbs up, Continue!",
      });

      if (error.response && error.response.data.message)
        return rejectWithValue(error.response.data.message);
      else {
        return rejectWithValue;
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "/auth/register",
  async (
    {
      email,
      password,
      role,
      name,
      organization,
      hospitalname,
      website,
      adress,
      phone,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        email,
        password,
        role,
        name,
        organization,
        hospitalname,
        website,
        adress,
        phone,
      });

      if (data.success) {
        toast.success(data.message);
        window.location.replace("/login");
      }
    } catch (error) {
      if (error.response && error.response.data.message)
        return rejectWithValue(error.response.data.message);
      else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "/auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/currentuser");

      if (res?.data) {
        // console.log(res?.data, "jumpp");
        return res?.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message)
        return rejectWithValue(error.response.data.message);
      else {
        return rejectWithValue(error.message);
      }
    }
  }
);
