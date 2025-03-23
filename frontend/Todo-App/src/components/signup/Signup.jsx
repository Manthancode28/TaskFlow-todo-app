import HeadingSing from "./HeadingSign";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

export default function Signup(){
  
   const [Inputs,setInputs] = useState({
      email: "",
      username: "",
      password: "",
   })
   const navigate = useNavigate();

   const change = (e) =>{
      const {name,value} = e.target;
      setInputs({...Inputs,[name] : value});
   }

   const submit = async (e) =>{
      e.preventDefault();
      console.log(Inputs);
      if(Inputs.email === "" || Inputs.username === "" || Inputs.password === ""){
         toast.error("Please fill all fields");
         return;
      }
      try{
        await axios.post("http://localhost:3000/api/v1/register", Inputs);
         toast.success("Signup Successfull");
         setInputs({
            email: "",
            username: "",
            password: "",
         });
         navigate("/signin");
        
      }catch(error){
         console.error("Signup Error:", error.response?.data || error.message);
         toast.error("User already exist");
      }
      // await axios.post("http://localhost:3000/api/v1/register", Inputs).then((res) =>{
      //    console.log(res.data);
         
      //    setInputs({
      //       email: "",
      //       username: "",
      //       password: "",
      //    });
      // });
   };
   return (
      <>
      <ToastContainer/>
      <div className="signup">
         <div className="container">
            <div className="row">
               {/* SingUp Page */ }
               <div className="col-lg-8 left-sign">
                  <div className="d-flex flex-column  left-sign-content">
                     <input type="email"  onChange={change} name="email" id="email" value={Inputs.email} className="p-2 my-3 inp-singup" placeholder="Enter your Email"/>
                     <input type="text" onChange={change} name="username" id="username" value={Inputs.username} className="p-2 my-3 inp-singup"placeholder="Enter Username"/>
                     <input type="password" onChange={change} name="password" id="password" value={Inputs.password} className="p-2 my-3 inp-singup" placeholder="Enter Password"/>
                     <button className="btn-signup" onClick={submit}>Signup</button>
                  </div>
               </div>
                {/* SingUp Page Heading Page */ }
               <div className="col-lg-4 right-sign">
                  <HeadingSing first="Sign" second="Up"/>
               </div>
            </div>
         </div>
      </div>
      </>
   )
}