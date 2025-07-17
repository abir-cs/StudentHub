import {  useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import DatePicker from "react-datepicker";

const EditStudent = () => {
    const formatDate = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
    };


    const {id}=useParams();
    const navigate = useNavigate();
    const {data:student,loading,error:err}=useFetch("http://localhost:8001/students/"+id)
    // .then(()=>{
    //     setBirthDate(parseDate(student.DB));
    //     setFname(student.Fname);
    //     setLname(student.Lname);
    //     setDesc(student.description);
    //     setBac(student.bacAVG)
    // })

    const [birthDate, setBirthDate] = useState(null);
    const [Fname,setFname]=useState('');
    const [Lname,setLname]=useState('');
    const [description,setDesc]=useState('');
    const [bacAVG, setBac]=useState('');

    const [error,setError]=useState(null);
 

    return ( <div className="editstud">
        {loading && <>loading...</>}
        {student && <>
            <h2>Edit Student #{id}</h2>
            <form >
                <label>first name :</label>
                <input type="text" required value={Fname} onChange={e=>setFname(e.target.value)}/>
                <label >last name :</label>
                <input type="text" required value={Lname} onChange={e=>setLname(e.target.value)}/>
                <label>bac average :</label>
                <input type="text" required value={bacAVG} onChange={e=>setBac(e.target.value)}/>
                {error && <p className="error" >{error} </p>}
                <label>birth date :</label>
                <div className="mydatepicker">
                <DatePicker
                    selected={birthDate}
                    onChange={(e) => setBirthDate(e)}
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    value={birthDate}
                    maxDate={new Date()} 
                />
                </div>
                <label >description :</label>
                <textarea required value={description} onChange={e=>setDesc(e.target.value)}></textarea>
                <button className="onlyme">Edit</button>
            </form>
        </> }
    </div> );
}
 
export default EditStudent;