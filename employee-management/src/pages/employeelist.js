import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [employeeResponse, companyResponse, departmentResponse] =
          await Promise.all([
            axios.get("http://127.0.0.1:8000/api/employees/", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("http://127.0.0.1:8000/api/companies/", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("http://127.0.0.1:8000/api/departments/", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        setEmployees(employeeResponse.data);
        setCompanies(companyResponse.data);
        setDepartments(departmentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, navigate]);

  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : "Unknown";
  };

  const getDepartmentName = (departmentId) => {
    const department = departments.find(
      (department) => department.id === departmentId
    );
    return department ? department.name : "Unknown";
  };

  const handleDelete = async (employeeId) => {
    try {
      if (!token) {
        console.error("No token found, user is not authenticated");
        navigate("/login");
        return;
      }

      await axios.delete(`http://127.0.0.1:8000/api/employees/${employeeId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(employees.filter((employee) => employee.id !== employeeId));

      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee.");
    }
  };

  const handleUpdate = (employeeId) => {
    navigate(`/update-employee/${employeeId}`);
  };

  return (
    <div>
      <h2>Employees List</h2>
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Company</th>
              <th>Department</th>
              <th>Hired On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile_number}</td>
                <td>{employee.designation}</td>
                <td>{employee.status}</td>
                <td>{getCompanyName(employee.company)}</td>
                <td>{getDepartmentName(employee.department)}</td>
                <td>{employee.hired_on}</td>
                <td>
                  <button onClick={() => handleUpdate(employee.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
};

export default ListEmployees;
