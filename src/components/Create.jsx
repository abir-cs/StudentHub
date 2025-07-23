import React, { useState } from "react";
import { use } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const [birthDate, setBirthDate] = useState(null);
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [description, setDesc] = useState("");
  const [bacAVG, setBac] = useState("");

  const [teacher, setTeacher] = useState("");
  const [name, setCourseName] = useState("");
  const [sessions, setSessions] = useState("");
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();

  const [error, setError] = useState(null);
  const [nameError, setNE] = useState(null);

  const getFormattedDuration = () => {
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    return `${h}h${m}min`;
  };
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const checkFullName = (name) => {
    const nameRegex = /^([a-zA-Z]+)( )([a-zA-Z]+)$/;
    if (nameRegex.test(name)) return null;
    else return "not correct full name format !";
  };
  const checkAVG = (avg) => {
    const numRegex = /^([0-9]+)(\.?)([0-9]*)$/;
    if (numRegex.test(avg)) {
      if (avg >= 0 && avg <= 20) return null;
      else return "average is bound by [0-20] !";
    } else return "not correct number format !";
  };
  const addStud = (e) => {
    e.preventDefault();
    const err = checkAVG(bacAVG);
    if (err) {
      setError(err);
    } else {
      setError(null);
      const DB = formatDate(birthDate);
      const courses = [];
      const student = { Fname, Lname, DB, description, bacAVG, courses };
      fetch("http://localhost:8001/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      }).then(() => {
        navigate("/");
      });
    }
  };
  const addcourse = (e) => {
    e.preventDefault();
    const err = checkFullName(teacher);
    if (err) setNE(err);
    else {
      setNE(null);
      const duration = getFormattedDuration();
      const course = { name, teacher, duration, sessions };

      fetch("http://localhost:8000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      }).then(() => {
        navigate("/courses");
      });
    }
  };

  return (
    <div className="create">
      <h2>Create new student</h2>
      <form onSubmit={addStud}>
        <label>first name :</label>
        <input
          type="text"
          required
          onChange={(e) => setFname(e.target.value)}
        />
        <label>last name :</label>
        <input
          type="text"
          required
          onChange={(e) => setLname(e.target.value)}
        />
        <label>bac average :</label>
        <input type="text" required onChange={(e) => setBac(e.target.value)} />
        {error && <p className="error">{error} </p>}
        <label>birth date :</label>
        <div className="mydatepicker">
          <DatePicker
            selected={birthDate}
            onChange={(e) => setBirthDate(e)}
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
          />
        </div>
        <label>description :</label>
        <textarea required onChange={(e) => setDesc(e.target.value)}></textarea>
        <button className="onlyme">Add</button>
      </form>

      <h2>Create new course</h2>
      <form onSubmit={addcourse}>
        <label>course name</label>
        <input
          type="text"
          required
          onChange={(e) => setCourseName(e.target.value)}
        />
        <label>teacher full name</label>
        <input
          type="text"
          required
          onChange={(e) => setTeacher(e.target.value)}
        />
        {nameError && <p className="error">{nameError} </p>}
        <label>total duration</label>
        <div className="dur">
          <label>
            hours:
            <input
              type="number"
              min="0"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
          </label>

          <label>
            minutes:
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </label>
        </div>
        <label> number of sessions</label>
        <input
          type="number"
          min="0"
          required
          onChange={(e) => setSessions(e.target.value)}
        />
        <button className="onlyme">Add</button>
      </form>
    </div>
  );
};

export default Create;
