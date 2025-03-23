import Navbar from "./components/navbar/NavBar"
// import Footer from './components/footer/Footer';
import About from "./components/about/About";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";
import Signin from "./components/signup/Signin";
import Todo from "./components/todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import { useEffect } from "react";
// import './App.css'
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login(id));
    }
    
  },[]);
  return (
    <>
     <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path ="/" element = {<Home></Home>}/>
          <Route path ="/about" element = {<About></About>}/>
          <Route path ="/todo" element = {<Todo></Todo>}/>
          <Route path ="/signup" element = {<Signup></Signup>}/>
          <Route path ="/signin" element = {<Signin></Signin>}/>
        </Routes>
      </Router> 
      
      </div>
    </>
  )
}

export default App
