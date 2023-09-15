import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/shared/Layout/Layout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "./Home.css";
const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <h2>
          Welcome admin <br></br>{" "}
          <SupervisorAccountIcon></SupervisorAccountIcon>
          <b>{user?.name}</b>{" "}
        </h2>
      </div>
      <div className="container">
        <h3
          style={{
            paddingLeft: "20rem",

            fontSize: "2rem",
          }}
        >
          Types Of Donation
        </h3>
        <p>
          The human body contains five liters of blood, which is made of several
          useful components i.e. Whole blood, Platelet, and Plasma. Each type of
          component has several medical uses and can be used for different
          medical treatments. your blood donation determines the best donation
          for you to make. For plasma and platelet donation you must have
          donated whole blood in past two years.
        </p>
      </div>
    </Layout>
  );
};

export default AdminHome;
