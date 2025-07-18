import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import DatePicker from "react-datepicker";
import axios from "axios";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState(null);

  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };
  const getStudent = async () => {
    const res = await axios.get("http://localhost:8001/students/" + id);
    const data = res.data;
    setStudent(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getStudent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const upRes = await fetch("http://localhost:8001/students/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    navigate(-1);
  };

  return (
    <div className="editstud">
      {isLoading && <>Loading...</>}
      {!isLoading && (
        <>
          <h2>Edit Student #{id}</h2>
          <form onSubmit={handleSubmit}>
            <label>first name :</label>
            <input
              type="text"
              required
              value={student.Fname}
              onChange={(e) => {
                setStudent({ ...student, Fname: e.target.value });
              }}
            />
            <label>last name :</label>
            <input
              type="text"
              required
              value={student.Lname}
              onChange={(e) => {
                setStudent({ ...student, Lname: e.target.value });
              }}
            />
            <label>bac average :</label>
            <input
              type="text"
              required
              value={student.bacAVG}
              onChange={(e) => {
                setStudent({ ...student, bacAVG: e.target.value });
              }}
            />
            {error && <p className="error">{error} </p>}
            <label>birth date :</label>
            <div className="mydatepicker">
              <DatePicker
                selected={parseDate(student.DB)}
                onChange={(e) => {
                  setStudent({ ...student, DB: formatDate(e) });
                }}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={parseDate(student.DB)}
                maxDate={new Date()}
              />
            </div>
            <label>description :</label>
            <textarea
              required
              value={student.description}
              onChange={(e) => {
                setStudent({ ...student, description: e.target.value });
              }}
            ></textarea>
            <button className="onlyme">Edit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditStudent;
