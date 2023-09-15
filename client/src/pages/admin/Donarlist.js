import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
const Donarlist = () => {
  const [data, setdata] = useState([]);
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      console.log(data);
      if (data?.success) {
        setdata(data.donarList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDonars();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      console.log(data, "budy");
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1>DONARS</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">adress</th>
            <th scope="col">Date </th>
            <th scope="col">Action </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name || record.organizationName + "(org)"}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.adress}</td>
              <td>{moment(record.createdAt).format("DD/MM/yyyy hh:mm A")}</td>
              <td>
                <div
                  className="btn btn-danger "
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Donarlist;
