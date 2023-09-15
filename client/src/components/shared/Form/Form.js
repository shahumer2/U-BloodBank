import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputType from "./InputType";
import "./Form.css";
import { handleLogin, handleRegister } from "../../../services/authServices";
import { toast } from "react-toastify";
const Form = ({ formType, submitBtn, FormTitle }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("donar");
  const [name, setname] = useState("");
  const [organization, setorganization] = useState("");
  const [hospitalname, sethospitalname] = useState("");
  const [website, setwebsite] = useState("");
  const [adress, setadress] = useState("");
  const [phone, setphone] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              email,
              password,
              role,
              name,
              organization,
              hospitalname,
              website,
              adress,
              phone
            );
        }}
      >
        <h1>{FormTitle}</h1>
        <hr></hr>
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              value={"donar"}
              id="donarRadio"
              onChange={(e) => {
                setrole(e.target.value);
              }}
              defaultChecked
            />
            <label htmlhtmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              value={"admin"}
              id="adminRadio"
              onChange={(e) => {
                setrole(e.target.value);
              }}
            />
            <label htmlhtmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              value={"hospital"}
              id="hospitalRadio"
              onChange={(e) => {
                setrole(e.target.value);
              }}
            />
            <label htmlhtmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              value={"organization"}
              id="organizationRadio"
              onChange={(e) => {
                setrole(e.target.value);
              }}
            />
            <label htmlhtmlFor="organizationRadio" className="form-check-label">
              organization
            </label>
          </div>
        </div>
        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelhtmlFor={"email"}
                    labelText={"Email"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <InputType
                    labelhtmlFor={"password"}
                    labelText={"Password"}
                    inputType={"Password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      className="name"
                      labelhtmlFor={"name"}
                      labelText={"name"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                  )}

                  <InputType
                    labelhtmlFor={"email"}
                    className="email"
                    labelText={"Email"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />

                  <InputType
                    labelhtmlFor={"adress"}
                    labelText={"adress"}
                    inputType={"text"}
                    name={"adress"}
                    value={adress}
                    onChange={(e) => {
                      setadress(e.target.value);
                    }}
                  />

                  {role === "organization" && (
                    <InputType
                      labelhtmlFor={"organization"}
                      labelText={"organization"}
                      inputType={"text"}
                      name={"organization"}
                      value={organization}
                      onChange={(e) => {
                        setorganization(e.target.value);
                      }}
                    />
                  )}

                  {role === "hospital" && (
                    <InputType
                      labelhtmlFor={"hospitalname"}
                      labelText={"hospitalname"}
                      inputType={"text"}
                      name={"hospitalname"}
                      value={hospitalname}
                      onChange={(e) => {
                        sethospitalname(e.target.value);
                      }}
                    />
                  )}

                  <InputType
                    labelhtmlFor={"website"}
                    labelText={"website"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => {
                      setwebsite(e.target.value);
                    }}
                  />

                  <InputType
                    labelhtmlFor={"phone"}
                    labelText={"phone"}
                    inputType={"number"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => {
                      setphone(e.target.value);
                    }}
                  />

                  <InputType
                    labelhtmlFor={"password"}
                    labelText={"Password"}
                    inputType={"Password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </>
              );
            }
          }
        })()}

        <button type="submit" className="btn btn-primary">
          {submitBtn}
        </button>
        {formType === "login" ? (
          <div className="butt">
            <p>Not a User ! Register Here</p>
            <Link to={"/register"}>
              <button className="btn btn-dark">register</button>
            </Link>
          </div>
        ) : (
          <div className="butt">
            <p>Already a User! Login Here</p>
            <Link to={"/login"}>
              <button className="btn btn-dark">Login</button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
