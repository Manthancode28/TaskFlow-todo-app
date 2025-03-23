import { ToastContainer, toast } from 'react-toastify';
import { useCallback, useEffect, useState } from "react";
import "./Todo.css"
import TodoCards from "./TodoCards";
import Update from './Update/Update';
// import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
// import { authActions } from "../../store";
import axios from "axios";
let id = sessionStorage.getItem("id");

const API_URL = import.meta.env.VITE_API_URL;


export default function Todo(){

   const [Inputs,setInputs] = useState({title:"",body:"", dueDate: ""})
   const [Array,setArray] = useState([])
   const [selectedTaskId, setSelectedTaskId] = useState(null);

   const show = () => {
      document.getElementById("textarea").style.display = "block";
   }
   const change = (e) =>{
      const {name,value} = e.target;
      setInputs({...Inputs,[name]:value});
   }

   const checkDueDates = () => {
      Array.forEach((task) => {
          const dueDate = new Date(task.dueDate);
          const now = new Date();
          if (dueDate < now) {
              new Notification("Task Due", {
                  body: `Your task "${task.title}" is due!`,
              });
          }
      });
  };
  
  // Call this function periodically (e.g., every minute)
  setInterval(checkDueDates, 60000);

   const submit = useCallback( async (e) => {
      e.preventDefault();
      if (Inputs.title.trim() === "" || Inputs.body.trim() === "") {
         toast.error("Please add Task");
         return;
      }
      
      if(id){
         try{
            await axios.post(`${API_URL}/api/v2/addTask`,{
               title : Inputs.title,
               body : Inputs.body,
               dueDate: Inputs.dueDate,
               id : id
            });
            
            setArray([...Array, Inputs]); 
            setInputs({ title: "", body: "", dueDate: "" });;
            toast.success("Your task is added!");
         }
         catch (error) {
            console.error("Error in /addTask route:", error);
            
        }
      }
      else{
         toast.error("Please login.");
      }
     
   },[Inputs,Array]);
   const del = async(CardId) =>{
      try{
        await axios.delete(`${API_URL}/api/v2/deleteTask/${CardId}`,{data:{id:id}});
        toast.success("Task Deleted");
      }
      catch(e){
         console.log(e);
      }
      
      
   } 
   const dis = (taskId) =>{
      setSelectedTaskId(taskId);
      document.getElementById("update-content").style.display = "block";
      document.getElementById("main-content").classList.add("change-main-content");
   }

   // useEffect(()=>{
   //    const fetchData = async () => {
   //      try {
   //          const res = await axios.get(`http://localhost:3000/api/v2/getTask/${id}`);
   //          setArray(res.data.list);
   //      } catch (error) {
   //          console.error("Error fetching tasks:", error);
   //      }
   //    };
   //    fetchData();
   // },[submit]);

  
    useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(`${API_URL}/api/v2/getTask/${id}`);
            if(res.data && res.data.list){
               setArray(res.data.list);
            }
            else{
               setArray([]);
            }
            
         } catch (error) {
            console.error("Error fetching tasks:", error.response?.data || error.message);
         }
      };
      if (id) fetchData();
   }, [submit]);
  
   return (
      <>
         {/* Todo Head */}
         <div className="todo" id='main-content'>
         <ToastContainer/>
            <div id='todo-main-div' className="container todo-main d-flex justify-content-center align-item-center flex-column">

               {/* Taking Input Tiltle and Body and Pass to Input state using useState */}
               <div className="todo-inp-div d-flex flex-column w-50 p-1">
                  <input 
                  type="text" name="title" id="title" placeholder="Title" 
                  className="my-2 p-2 todo-inp" onClick={show} onChange={change} value={Inputs.title}/>

                  <textarea name="body" id="textarea" placeholder="Body" className="p-2 todo-inp" onChange={change} value={Inputs.body}></textarea>

                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={Inputs.dueDate}
                    onChange={change}
                />
               </div>
               
               {/* When user click submit button tilte and body store in array  */}
               <div className="d-flex w-50 justify-content-end mt-3">
                  <button className="add-todo btn btn-success" onClick={submit}>Add</button>
               </div>
            </div>

            {/* Todo Body */}
            <div className="todo-body">
               <div className="container-fluid">
                  <div className="row row-cards">
                     {Array.length>0 ? (Array.map((item, index) => (
                        <div key={index} className="col-lg-3 todo-text mx-5 my-2  text-black p-3">
                           <TodoCards title={item.title} body={item.body} id={item._id} delid={del} display={dis} dueDate={item.dueDate}/>
                        </div>
                     ))) : (<div className="col-12 text-center">
                        <p className="text-muted">No tasks found. Add a task to get started!</p>
                    </div>)}
                  </div>
               </div>
            </div>


         </div>
         <div className="todo-update" id="update-content">
            <div className="cont ainer">
            <Update  display={dis}  taskId={selectedTaskId}/>
            </div>  
         </div>
      </>
   )
}