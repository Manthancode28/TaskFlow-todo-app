import { useState } from "react";
import axios from "axios";
import HeadingSing from "./HeadingSign";
import "./Signup.css";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

export default function Signin(){
   const dispatch = useDispatch();

   const [Inputs,setInputs] = useState({
      email: "",
      password: "",
   });
   const navigate = useNavigate();

   const change = (e) =>{
      const {name,value} = e.target;
      setInputs({...Inputs,[name] : value});
   }

   const submit = async (e) =>{
      e.preventDefault();
      if(Inputs.email == "" || Inputs.password === ""){
         toast.error("Please fill all details");
         return;
      }
      try{
         const res = await axios.post("http://localhost:3000/api/v1/signin", Inputs);
         sessionStorage.setItem("id",res.data.user._id);
         dispatch(authActions.login());
         navigate("/todo");
      }
      catch(error){
         console.log(error);
      }
   }
   return(
      <>
         <ToastContainer/>
         <div className="signup">
                  <div className="container">
                     <div className="row">
                         {/* SingUp Page Heading Page */ }
                         <div className="col-lg-4 right-sign">
                           <HeadingSing first="Sign" second="In"/>
                        </div>
                        {/* SingUp Page */ }
                        <div className="col-lg-8 left-sign">
                           <div className="d-flex flex-column  left-sign-content">
                              <input type="email" name="email"onChange={change} value={Inputs.email} id="email" className="p-2 my-3 inp-singup" placeholder="Enter your Email"/>
                              <input type="password" name="password" onChange={change} value={Inputs.password} id="password" className="p-2 my-3 inp-singup" placeholder="Enter Password"/>
                              <button className="btn-signup" onClick={submit}>Singin</button>
                           </div>
                        </div>
                        
                  </div>
               </div>
         </div>
      </>
   )
}