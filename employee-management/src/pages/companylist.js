import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.error("No token found, user is not authenticated");
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/companies/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, [token, navigate]);

  const fetchCompanyDetails = (companyId) => {
    if (!token) {
      console.error("No token found, user is not authenticated");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/companies/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCompanyInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching company details:", error);
      });
  };

  const handleCompanyClick = (companyId) => {
    setSelectedCompanyId(companyId);
    fetchCompanyDetails(companyId);

    axios
      .get(`http://127.0.0.1:8000/api/departments/?company=${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  };

  const handleUpdateCompany = (companyId) => {
    navigate(`/update-company/${companyId}`);
  };

  const handleDeleteCompany = (companyId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/companies/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Company deleted successfully");
        setCompanies(companies.filter((company) => company.id !== companyId));
      })
      .catch((error) => {
        console.error("Error deleting company:", error);
      });
  };

  return (
    <div>
      <h2>Companies List</h2>
      {companies.length > 0 ? (
        <ul>
          {companies.map((company) => (
            <li key={company.id}>
              <h3>{company.name}</h3>
              {selectedCompanyId === company.id && (
                <>
                  <p>
                    Number of Departments: {companyInfo.number_of_departments}
                  </p>
                  <p>Number of Employees: {companyInfo.number_of_employees}</p>
                </>
              )}
              <button onClick={() => handleCompanyClick(company.id)}>
                Show Details & Departments
              </button>
              <button onClick={() => handleUpdateCompany(company.id)}>
                Update
              </button>
              <button onClick={() => handleDeleteCompany(company.id)}>
                Delete
              </button>
              {selectedCompanyId === company.id && (
                <div>
                  <p>Departments:</p>
                  <ul>
                    {departments.map((department) => (
                      <li key={department.id}>{department.name}</li>
                    ))}
                  </ul>
                  {departments.length === 0 && <p>No departments found</p>}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies found</p>
      )}
    </div>
  );
};

export default ListCompanies;
