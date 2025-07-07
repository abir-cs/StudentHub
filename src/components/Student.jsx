import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Student = () => {
    const {id}=useParams();
    const {data:student,loading,error}=useFetch("http://localhost:8001/students/"+id)
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
    </div>
    }
    </>
    );
}
 
export default Student;