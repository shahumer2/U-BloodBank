import React, { useState } from "react";
import API from "../../../services/API";
import { useSelector } from "react-redux";
const Modal = () => {
  const [inventoryType, setinventoryType] = useState("in");
  const [bloodGroup, setbloodGroup] = useState("");
  const [quantity, setquantity] = useState(0);
  const [email, setemail] = useState("");
  const { user } = useSelector((state) => state.auth);
  const handleModalSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!bloodGroup || !quantity) return alert("please enter all fields");

      const { data } = await API.post("/inventory/create-inventory", {
        organization: user?._id,

        email,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Manage Blood Record
              </h5>
              <button
                type="button"
                className="close px-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">X</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="d-flex">
                Blood Type &nbsp;
                <div className="form-check mx-3">
                  <input
                    type="radio"
                    defaultChecked
                    name="inRadio"
                    value={"in"}
                    onChange={(e) => setinventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="in" className="form-check-label">
                    IN
                  </label>
                </div>
                <div className="form-check mx-3">
                  <input
                    type="radio"
                    name="inRadio"
                    value={"out"}
                    onChange={(e) => setinventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="out" className="form-check-label">
                    OUT
                  </label>
                </div>
              </div>
              <select
                className="form-select my-3"
                aria-label="Default select example"
                onChange={(e) => setbloodGroup(e.target.value)}
              >
                <option defaultValue={"Select Blood Group"}></option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
              </select>
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Donar email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
              />
              <label htmlFor="quantity">Quantity (ML)</label>
              <input
                type="Number"
                className="form-control"
                id="quantity"
                placeholder="Enter quantity"
                onChange={(e) => setquantity(e.target.value)}
                value={quantity}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
