import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [nameError, setNE] = useState(null);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();

  const parseFormattedDuration = (durationStr) => {
    const match = durationStr.match(/^(\d{2})h(\d{2})min$/);
    if (!match) return { hours: 0, minutes: 0 }; // or handle invalid input however you like

    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);

    return { hours, minutes };
  };
  const getFormattedDuration = () => {
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    return `${h}h${m}min`;
  };
  const checkFullName = (name) => {
    const nameRegex = /^([a-zA-Z]+)( )([a-zA-Z]+)$/;
    if (nameRegex.test(name)) return null;
    else return "not correct full name format !";
  };
  const getCourse = async () => {
    const res = await axios.get("http://localhost:8000/courses/" + id);
    const data = res.data;
    setCourse(data);
    setHours(parseFormattedDuration(data.duration).hours);
    setMinutes(parseFormattedDuration(data.duration).minutes);
    setIsLoading(false);
  };
  useEffect(() => {
    getCourse();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = checkFullName(course.teacher);
    if (err) setNE(err);
    else {
      const upRes = await fetch("http://localhost:8000/courses/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      navigate(-1);
    }
  };

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
              value={course.name}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <label>teacher full name</label>
            <input
              type="text"
              required
              value={course.teacher}
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
                  value={parseFormattedDuration(course.duration).hours}
                  onChange={(e) => {
                    setHours(Number(e.target.value));
                    setCourse({
                      ...course,
                      duration: getFormattedDuration(),
                    });
                  }}
                />
              </label>

              <label>
                minutes:
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={parseFormattedDuration(course.duration).minutes}
                  onChange={(e) => {
                    setMinutes(Number(e.target.value));
                    setCourse({
                      ...course,
                      duration: getFormattedDuration(),
                    });
                  }}
                />
              </label>
            </div>
            <label> number of sessions</label>
            <input
              type="number"
              min="0"
              required
              value={course.sessions}
              onChange={(e) =>
                setCourse({ ...course, sessions: e.target.value })
              }
            />
            <button className="onlyme">Edit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditCourse;
