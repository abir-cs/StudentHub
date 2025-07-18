import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import DatePicker from "react-datepicker";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const getCourse = async () => {
    const res = await axios.get("http://localhost:8000/courses/" + id);
    const data = res.data;
    setCourse(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getCourse();
  }, []);
  const handleSubmit = () => {};
  return (
    <div className="editCourse">
      {isLoading && <>loading...</>}
      {!isLoading && (
        <>
          <h2>Create new course</h2>
          <form onSubmit={handleSubmit}>
            <label>course name</label>
            <input
              type="text"
              required
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <label>teacher full name</label>
            <input
              type="text"
              required
              onChange={(e) =>
                setCourse({ ...course, teacher: e.target.value })
              }
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
              onChange={(e) =>
                setCourse({ ...course, session: e.target.value })
              }
            />
            <button className="onlyme">Add</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditCourse;
