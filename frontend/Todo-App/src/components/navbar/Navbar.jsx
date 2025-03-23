import './Navbar.css';
import { LuListTodo } from "react-icons/lu";
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

export default function Navbar(){
   const isLoggedIN = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const logout = () =>{
      sessionStorage.clear("id");
      dispatch(authActions.logout());
    }
   return (
      <>
      <nav className="navbar navbar-expand-lg">
      <div className="container">
         <Link className="navbar-brand" to="#"><b> <LuListTodo />
         &nbsp;
         TaskFlow</b></Link>
         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2 nav-contents">
               <Link className="nav-link active btn-nav" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item mx-2 nav-contents">
               <Link className="nav-link active btn-nav" aria-current="page" to="/about">About Us</Link>
            </li>
            <li className="nav-item mx-2 nav-contents">
               <Link className="nav-link active btn-nav" aria-current="page" to="/todo">Todo</Link>
            </li>

            {!isLoggedIN && <><li className="nav-item mx-2 nav-contents">
               <Link className="nav-link active btn-nav" aria-current="page" to="/signup">Signup</Link>
               </li>
               <li className="nav-item mx-2 nav-contents">
               <Link className="nav-link active btn-nav" aria-current="page" to="/signin">Signin</Link>
               </li></>
            }
            
            {
               isLoggedIN && <><li className="nav-item mx-2 nav-contents" onClick={logout}>
               <Link className="nav-link active btn-nav" aria-current="page" to="#">Log Out</Link>
               </li></>
            }
            </ul>            
         </div>
      </div>
      </nav>
      </>
   )
};