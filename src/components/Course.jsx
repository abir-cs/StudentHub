import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Course = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const {
    data: course,
    loading,
    error,
  } = useFetch("http://localhost:8000/courses/" + id);
  const handledelete = async () => {
    await fetch("http://localhost:8000/courses/" + id, { method: "DELETE" });
    fetch("http://localhost:8001/students")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.map(async (student) => {
          const upcourses = student.courses.filter((course) => course != id);
          await fetch("http://localhost:8001/students/" + student.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...student, courses: upcourses }),
          });
        });
      })
      .then(() => nav(-1));
  };
  return (
    <>
      <h2>#{id} Course Details </h2>
      {loading && <p>loading ...</p>}
      {error && <p>{error}</p>}
      {course && (
        <div className="studentDetails">
          <p>course : {course.name}</p>
          <p>teacher : {course.teacher}</p>
          <p>total duration : {course.duration}</p>
          <p>number of sessions : {course.sessions}</p>
          <div className="buttons">
            <button onClick={handledelete}>Delete</button>
            <Link to="./edit">
              <button>Edit</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Course;
