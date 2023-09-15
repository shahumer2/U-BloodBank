import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/Modal/Modal";
import API from "../services/API";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      console.log("newww", data);
      if (data?.success) {
        setdata(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Layout>
        {user?.role === "admin" && navigate("/admin")}
        <h4
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-plus text-success py-4 px-3"></i>
          Add Inventory
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} (ML)</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/yyyy hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal />
      </Layout>
    </>
  );
};

export default HomePage;
