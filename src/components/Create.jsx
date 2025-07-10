import React, { useState } from "react";
import { use } from "react";
import DatePicker from "react-datepicker";

const Create = () => {
    const [birthDate, setBirthDate] = useState(null);
    const [Fname,setFname]=useState('');
    const [Lname,setLname]=useState('');
    const [desc,setDesc]=useState('');
    const [bac, setBac]=useState('');

    const formatDate = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return ( <div className="create">
        <h2>Create new student</h2>
        <form action="">
            <label>first name :</label>
            <input type="text" required onChange={e=>setFname(e.target.value)}/>
            <label >last name :</label>
            <input type="text" required onChange={e=>setLname(e.target.value)}/>
            <label>bac average :</label>
            <input type="number" required onChange={e=>setBac(e.target.value)}/>
            <label>birth date :</label>
            <div className="mydatepicker">
            <DatePicker
                selected={birthDate}
                onChange={(e) => setBirthDate(e)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select your birth date"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()} 
             />
            </div>
            <label >description :</label>
            <textarea required onChange={e=>setDesc(e.target.value)}></textarea>
            <button className="onlyme">Add</button>
        </form>
        {/* <p>{Fname}</p>
        <p>{Lname}</p>
        <p>{bac}</p>
        <p>{desc}</p>
       {console.log(birthDate)}
        <p>{formatDate(birthDate)}</p> */}
    </div> );
}
 
export default Create;