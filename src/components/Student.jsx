import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect ,useState} from "react";

const Student = () => {
    const {id}=useParams();
    const {data:student,loading,error}=useFetch("http://localhost:8001/students/"+id);
    const [courses, setCourses] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [coursesError, setCoursesError] = useState(null);
    
    useEffect(() => {
        if (student && student.courses && student.courses.length > 0) {
            setCoursesLoading(true);
            Promise.all(
                student.courses.map(courseId =>
                    fetch("http://localhost:8000/courses/" + courseId)
                        .then(res => {
                            if (!res.ok) throw Error("Failed to fetch course " + courseId);
                            return res.json();
                        })
                )
            )
            .then(setCourses)
            .catch(err => setCoursesError(err.message))
            .finally(() => setCoursesLoading(false));
        }
    }, [student]);

    return ( 
    <>
    <h2>#{id} Student Details </h2>
    {loading && <p>loading ...</p>}
    {error && <p>{error}</p>}
    {student && <div >
        <div className="studentDetails">
            <p>first name : {student.Fname}</p>
            <p>last name : {student.Lname}</p>
            <p>date of birth : {student.DB}</p>
            <p>bac average : {student.bacAVG}</p>
            <p>description : {student.description}</p>
            <div className="buttons"><button>Delete</button><button>Edit</button></div>
            
        </div> 
        <h2>Courses</h2>
        <div className="studentCourses">
            {coursesLoading && <p>loading ...</p>}
            {coursesError && <p>{coursesError}</p>}
            {courses.length > 0 ? (
                courses.map((course, index) => (
                    <Link to={`/courses/${course.id}`}>
                    <div key={index} className="stdCourse">
                        <h3>{course.name}</h3>
                        <p>by {course.teacher}</p>
                    </div>
                    </Link>
                ))
            ) : (
                !coursesLoading && <p>No courses found.</p>
            )}
        </div>
        <Link to={`./addCourse`}>
        <button className="onlyme">Add Course</button>
        </Link>
    </div>
    }
    </>
    );
}
 
export default Student;