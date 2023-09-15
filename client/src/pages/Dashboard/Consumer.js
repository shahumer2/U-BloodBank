import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";
const Consumer = () => {
  const user = useSelector((state) => state.auth);
  const [data, setdata] = useState([]);
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
        },
      });
      console.log(data);
      if (data?.success) {
        setdata(data.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <div className="container my-3 mx-2">
        <h1>CONSUMER PAGE</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">email</th>
              <th scope="col">Date </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/yyyy hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Consumer;
