import { Link } from "react-router-dom";
import useFetch from "./useFetch";

const StudentsList = () => {
    const {data:Students,loading,error}=useFetch("http://localhost:8001/students");
    
    return ( 
        <div className="SL">
            {loading && <p>Loading...</p>}
            {error && <p className="err">{error}</p>}
            {Students && <> 
            {Students.map(student=>(
                <Link to={"/students/"+student.id}>
                    <div className="studentPreview" key={student.id}>
                        <h2>{student.Lname} {student.Fname}</h2>
                        <p>currently on {student.courses.length} courses</p>
                    </div>
                </Link>
            ))}
            </>
            }
        </div>
     );
}
 
export default StudentsList;