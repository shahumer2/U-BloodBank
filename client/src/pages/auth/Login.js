import React from "react";
import Form from "../../components/shared/Form/Form";

import "./Login.css";
const Login = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-7 formbanner">
          <img src="./assets/images/banner1.jpg" alt="" />
        </div>
        <div className="col-md-5 form-container">
          <Form
            FormTitle={"Login Page"}
            submitBtn={"Login"}
            formType={"login"}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
