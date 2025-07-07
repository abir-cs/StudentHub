import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="navbar">
        <h1>Our Students</h1>
        <div className="links">

        <Link to="/">Students List</Link>
        <Link to="/courses">Courses List</Link>
        <Link to="/create">Create+</Link>
        </div>
        </div>
     );
}
 
export default Navbar;