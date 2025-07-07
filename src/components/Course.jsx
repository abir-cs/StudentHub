import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Course = () => {
    const {id}=useParams();
    const {data:course,loading,error}=useFetch("http://localhost:8000/courses/"+id)
    return ( <>
    <h2>#{id} Course Details </h2>
    {loading && <p>loading ...</p>}
    {error && <p>{error}</p>}
    {course && 
    <div className="studentDetails">
        <p>course : {course.name}</p>
        <p>teacher : {course.teacher}</p>
        <p>total duration : {course.duration}</p>
        <p>number of sessions : {course.sessions}</p>
        <div className="buttons"><button>Delete</button><button>Edit</button></div>
        
    </div>  }
    </>
);
}
 
export default Course;