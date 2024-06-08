import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/styles/updateemployee.css";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [employeeData, setEmployeeData] = useState({
    company: "",
    department: "",
    status: "onboarding",
    name: "",
    email: "",
    mobile_number: "",
    address: "",
    designation: "",
    hired_on: "",
  });

  const [initialStatus, setInitialStatus] = useState("");

  useEffect(() => {
    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/employees/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployeeData({
          ...response.data,
          hired_on: response.data.hired_on
            ? new Date(response.data.hired_on).toISOString().slice(0, 10)
            : "",
        });
        setInitialStatus(response.data.status);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
      });
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "status" && value === "active" && initialStatus !== "active") {
      setEmployeeData({
        ...employeeData,
        status: value,
        hired_on: new Date().toISOString().slice(0, 10),
      });
    } else {
      setEmployeeData({
        ...employeeData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        console.error("No token found, user is not authenticated");
        navigate("/login");
        return;
      }

      const requestData = {
        ...employeeData,
        hired_on: employeeData.hired_on
          ? new Date(employeeData.hired_on).toISOString().slice(0, 10)
          : null,
      };

      if (requestData.status !== "active") {
        delete requestData.days_employed;
      }

      await axios.put(
        `http://127.0.0.1:8000/api/employees/${id}/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee updated successfully!");
      navigate("/list-employee");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Error updating employee.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Company:</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={employeeData.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Department:</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={employeeData.department}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Status:</label>
          <select
            className="form-control"
            name="status"
            value={employeeData.status}
            onChange={handleChange}
          >
            <option value="onboarding">Onboarding</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Mobile Number:</label>
          <input
            type="text"
            className="form-control"
            name="mobile_number"
            value={employeeData.mobile_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={employeeData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Designation:</label>
          <input
            type="text"
            className="form-control"
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Hired On:</label>
          <input
            type="date"
            className="form-control"
            name="hired_on"
            value={employeeData.hired_on}
            onChange={handleChange}
            disabled={employeeData.status !== "active"}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
