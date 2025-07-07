import { Link } from "react-router-dom";
import useFetch from "./useFetch";

const CoursesList = () => {
    const {data:courses,loading,error}=useFetch("http://localhost:8000/courses");

    return ( 
        <div className="courseslist">
          {loading && <p>Loading...</p>}
            {error && <p className="err">{error}</p>}
            {courses && <> 
            {courses.map(course=>(
                <Link to={"/courses/"+course.id}>
                    <div className="studentPreview" key={course.id}>
                        <h2>{course.name} </h2>
                        <p>by {course.teacher}</p>
                    </div>
                </Link>
            ))}
            </>
            }
        </div>
     );
}
 
export default CoursesList
