import React from "react";
import Form from "../../components/shared/Form/Form";
import "./Register.css";

const Register = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-7 formbanner">
          <img src="./assets/images/banner2.jpg" alt="" />
        </div>
        <div className="col-md-5 form-container">
          <Form
            FormTitle={"Register Page"}
            submitBtn={"Signup"}
            formType={"register"}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
