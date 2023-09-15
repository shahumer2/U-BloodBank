import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { useSelector } from "react-redux";
const Organization = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setdata] = useState([]);
  const getOrganization = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-organization");
        console.log(data);
        if (data?.success) {
          setdata(data?.organizations);
        }
      }

      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organization-for-hospital"
        );
        console.log(data);
        if (data?.success) {
          setdata(data?.organizations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrganization();
  }, [user]);

  return (
    <Layout>
      <div className="container mx-2 my-3">
        <h1>Organization Page</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">adress</th>
              <th scope="col">Date </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.organization}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.adress}</td>
                <td>{moment(record.createdAt).format("DD/MM/yyyy hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Organization;
