import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DepartmentsListPage = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/departments/"
        );
        setDepartments(response.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div>
      <h2>Departments List</h2>
      <Link to="/departments/create">Create New Department</Link>
      <ul>
        {departments.map((department) => (
          <li key={department.id}>
            <Link to={`/departments/${department.id}`}>{department.name}</Link>{" "}
            -<button>Delete</button> {/* Implement delete functionality */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsListPage;
