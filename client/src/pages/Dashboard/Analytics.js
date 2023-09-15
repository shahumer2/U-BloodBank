import { React, useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
const Analytics = () => {
  const [data, setdata] = useState([]);

  const getBloodRecords = async (req, res) => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setdata(data?.bloodGroupData);
        console.log(data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <h3 className="m-3 p-3">Analysis Page</h3>

      <div className="d-flex flex-row flex-wrap">
        {data.map((record) => (
          <div
            key={record.bloodGroup}
            className="card p-2 m-2"
            style={{ width: "18rem", backgroundColor: "#F8F0E5" }}
          >
            <div className="card-body">
              <h5 className="card-title text-center text-dark bg-light">
                {record.bloodGroup}
              </h5>
              <p className="card-text">
                Total In : <b>{record.totalIn}</b>
                <br></br>
                Total Out : <b>{record.totalOut}</b>
                <br></br>
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Available Quantity(ML) : <b>{record.availableBlood}</b>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Analytics;
