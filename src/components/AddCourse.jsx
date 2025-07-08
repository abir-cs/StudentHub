import { useParams,useNavigate } from "react-router-dom";
import useFetch from "./useFetch";


const AddCourse =() => {
    const {id}=useParams();
    const navigate = useNavigate();
    const {data:courses,loading,error}=useFetch("http://localhost:8000/courses");


    const handleclick= async(newid)=>{ 
        console.log(newid)
        const res=await fetch("http://localhost:8001/students/"+id);
        const student = await res.json();   
        const upCourses= student.courses.includes(newid)
        ? student.courses : [...student.courses, newid];
        const upRes=await fetch("http://localhost:8001/students/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({...student, courses:upCourses}),
           
        }); 
        navigate(-1);
    }


    return ( 
        <div className="courseslist">
          {loading && <p>Loading...</p>}
            {error && <p className="err">{error}</p>}
            {courses && <> 
            {courses.map(course=>(
                
                <div className="studentPreview" key={course.id} onClick={()=> handleclick(course.id)} >
                    <h2>{course.name} </h2>
                    <p>by {course.teacher}</p>
                </div>

            ))}
            </>
            }
        </div>
     );

}
 
export default AddCourse;